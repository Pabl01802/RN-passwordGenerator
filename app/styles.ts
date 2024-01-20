import { StyleSheet } from 'react-native'

const primary = '#24232B'
const secondary = '#18171F'

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0B0A0F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    passwordGeneratorContainer: {
        width: '90%',
        height: '80%',
        gap: 20
    },
    header: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 22,
    },
    generated: {
        backgroundColor: primary,
        justifyContent: 'center',
        height: '10%',
        padding: 20
    }, 
    properties: {
        backgroundColor: primary,
        height: '80%',
        padding: 20
    },
    passwordStrength: {
        backgroundColor: secondary,
        marginTop: 20,
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    generateButton: {
        backgroundColor: '#A6FAB2',
        marginTop: 20,
        padding: 10
    },
})