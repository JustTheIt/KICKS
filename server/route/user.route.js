import { Router } from 'express'
import { forgotPasswordController, loginController, logoutController, refreshToken, registerUserController, resetpassword, updateUserDetails, uploadAvatar, userDetails, verifyEmailController, verifyForgotPasswordOtp, getAllUsersController, updateUserStatusController, deleteUserController } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { isAdmin } from '../middleware/auth.middleware.js'

const userRouter = Router()

// Public routes
userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp)
userRouter.put('/reset-password', resetpassword)
userRouter.post('/refresh-token', refreshToken)

// Protected routes
userRouter.get('/logout', auth, logoutController)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)
userRouter.put('/update-user', auth, updateUserDetails)
userRouter.get('/user-details', auth, userDetails)

// Admin routes
userRouter.get('/all-users', auth, isAdmin, getAllUsersController)
userRouter.put('/update-user-status/:userId', auth, isAdmin, updateUserStatusController)
userRouter.delete('/delete-user/:userId', auth, isAdmin, deleteUserController)

export default userRouter