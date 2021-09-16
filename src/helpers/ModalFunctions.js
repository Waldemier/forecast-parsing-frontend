import {Modal} from "antd";

export const successConfirmation = () => {
    Modal.success({
        title: 'Congrats!',
        content: 'Your account has confirmed successfully',
    })
}

export const warnConfirmation = () => {
    Modal.warn({
        title: 'Register confirmation troubles',
        content: 'Something went wrong with register confirmation. Please, try again later.',
    });
}

export const successRegister = () => {
    Modal.warn({
        title: 'Check your email!',
        content: 'Email with confirmation link has sent!',
    })
}

export const rejectedRegister = () => {
    Modal.error({
        title: 'Registration process error',
        content: 'Something went wrong. Try again later.',
    });
}

export const successForgotProcess = () => {
    Modal.success({
        title: 'Check your email!',
        content: 'Email with verifying link has sent!',
    })
}

export const rejectedForgotProcess = () => {
    Modal.warn({
        title: 'User with entered email doesn\'t exist!',
        content: 'Please, enter your existing email.',
    })
}

export const rejectedVerificationForgotPasswordProcess = () => {
    Modal.error({
        title: 'Verification token has expired!',
        content: 'Please, send the form again.',
    })
}

export const successChangingPasswordProcess = () => {
    Modal.success({
        title: 'Password has changed successfully!',
        content: 'Try to log in again.',
    })
}

export const rejectedChangingPasswordProcess = () => {
    Modal.error({
        title: 'Changing password process has rejected!',
        content: 'Please, send the form again',
    })
}


export const incorrectPasswordDuringLogin = () => {
    Modal.error({
        title: 'Incorrect data entered!',
        content: 'Please, enter the data more carefully.',
    })
}

export const newlyUserCreatedSuccessfully = () => {
    Modal.success({
        title: 'New user has created successfully',
    })
}

export const userUpdateSuccessfully = () => {
    Modal.success({
        title: 'User updated successfully',
    })
}