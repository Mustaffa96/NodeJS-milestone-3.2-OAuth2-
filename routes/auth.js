const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiates Google OAuth2 authentication
 *     tags: [Authentication]
 *     description: Redirects the user to Google's login page
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth2 callback URL
 *     tags: [Authentication]
 *     description: Handles the callback from Google OAuth2
 *     responses:
 *       302:
 *         description: Redirects to dashboard on success, login on failure
 */
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/dashboard'
    })
);

/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Check authentication status
 *     tags: [Authentication]
 *     description: Returns the current user's authentication status and profile
 *     responses:
 *       200:
 *         description: Authentication status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: req.user
        });
    } else {
        res.json({
            isAuthenticated: false,
            user: null
        });
    }
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     description: Logs out the current user and ends their session
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error logging out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;
