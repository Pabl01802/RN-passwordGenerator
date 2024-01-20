import { Stack } from 'expo-router'

const _layout = () => {

  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#0B0A0F'
            },
        }} />
    </Stack>
  )
}

export default _layout