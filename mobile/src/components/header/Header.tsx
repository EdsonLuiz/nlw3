import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { BackButton, Container, HeaderText } from './styles'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function Header({ title, showCancel = true }: HeaderProps) {
  const { navigate, goBack } = useNavigation()

  const handleGoToHomePage = useCallback(() => {
    navigate('Orphanages')
  }, [navigate])

  return (
    <Container>
      <BackButton onPress={goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BackButton>
      <HeaderText>{title}</HeaderText>
      {showCancel ?
        (
          <BackButton onPress={handleGoToHomePage}>
            <Feather name="x" size={24} color="#ff669d" />
          </BackButton>
        )
        : <View />
      }
    </Container>
  )
}