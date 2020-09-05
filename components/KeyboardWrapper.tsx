import React, { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

export interface KeyboardWrapperProps {
    children: ReactNode
    style?: any
}

export default function KeyboardWrapper({
    children,
    style,
}: KeyboardWrapperProps) {
    return (
        <KeyboardAvoidingView
            style={style}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>
    )
}
