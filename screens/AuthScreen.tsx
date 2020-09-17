import React from 'react'
import UIButton from 'components/ui/UIButton'
import UILayout from 'components/ui/UILayout'

const AuthScreen = ({ navigation }) => {
    return (
        <UILayout style={{ alignItems: 'center', justifyContent: 'center' }}>
            <UIButton onPress={() => navigation.goBack()}>Назад</UIButton>
        </UILayout>
    )
}

export default AuthScreen
