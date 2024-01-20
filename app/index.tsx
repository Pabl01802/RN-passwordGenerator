import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { useState, useReducer } from 'react'
import { styles } from './styles'
import { useFonts } from 'expo-font'
import { Slider } from '@miblanchard/react-native-slider'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { TouchableOpacity } from 'react-native-gesture-handler'

const initialState = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
}

const checkboxActionTypes = {
    setUppercase: "SET_UPPERCASE",
    setLowercase: "SET_LOWERCASE",
    setNumbers: "SET_NUMBERS",
    setSymbols: "SET_SYMBOLS"
}

function checkboxReducer(prev = initialState, action){
    switch(action.type){
        case "SET_UPPERCASE":
            return {
                ...prev,
                uppercase: !prev.uppercase
            }
        case "SET_LOWERCASE":
            return {
                ...prev,
                lowercase: !prev.lowercase
            }
        case "SET_NUMBERS":
            return {
                ...prev,
                numbers: !prev.numbers
            }
        case "SET_SYMBOLS":
            return {
                ...prev, 
                symbols: !prev.symbols
            }
        default:
            return prev
    }
}

const Index = () => {

    const [generated, setGenerated] = useState<string>('')
    const [sliderValue, setSliderValue] = useState<any>(6)
    const [state, dispatch] = useReducer(checkboxReducer, initialState)
    const [level, setLevel] = useState<number>(0)

    const passwordProperties:Array<string> = ['Include Uppercase Letters', 'Include Lowercase Letters', 'Include Numbers', 'Include Symbols']
    const lettersArray:Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const numbersArray:Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const symbolsArray:Array<string> = ['!','@','#','$','%','^','&','*']

    const [fontsLoaded] = useFonts({
        "Maitree": require('../assets/fonts/Maitree-Regular.ttf')
    })

    if(!fontsLoaded){
        return undefined
    }

    const countChars = () => {
        let special: number = 0, numbers: number = 0, lower:number = 0, upper:number = 0
        for(let i of pass){
            if(symbolsArray.includes(i)){
                special++
            }else if(numbersArray.includes(i)){
                numbers++
            }else if(lettersArray.includes(i)){
                lower++
            }else if(!lettersArray.includes(i) && lettersArray.includes(i.toLowerCase())){
                upper++
            }
        }
        return { special, numbers, lower, upper }
    }

    const handlePassLevel = (pass:string) => {
        setGenerated(pass)
        let special: number = countChars().special, numbers: number = countChars().numbers, lower:number = countChars().lower, upper:number = countChars().upper
        if(pass.length < 10){
            if(special >= 2 || numbers >= 3 || upper > 9){
                setLevel(2)
            }else{
                setLevel(1)
            }
        }else if(pass.length >= 10 && pass.length <= 12){
            if(special >= 2 || numbers >= 3 || upper >= 10){
                setLevel(3)
            }else{
                setLevel(2)
            }
        }else if(pass.length > 12 && pass.length < 20){
            if(special >= 5 || numbers >= 6 || upper >= 15){
                setLevel(4)
            }else{
                setLevel(3)
            }
        }else if(pass.length >= 20){
            if(special >= 5 || numbers >= 6 || upper >= 15){
                setLevel(4)
            }else{
                setLevel(3)
            }
        }
    }

    let pass:string = ''
    const handleGeneratePassword = () => {
        let checkedCount = 0
        const selected = []
        for(let [key, value] of Object.entries(state)){
            if(value){
                checkedCount++
                selected.push(key)
            }
        }

        let randomIndex = Math.round(Math.random() * lettersArray.length)
        randomIndex === lettersArray.length && randomIndex--

        while(pass.length !== sliderValue){
            let parentChance = Math.ceil(Math.random() * checkedCount) - 1
            let randomLetterIndex = Math.round(Math.random() * lettersArray.length)
            randomLetterIndex === lettersArray.length && randomLetterIndex--
            let randomChar = lettersArray[randomLetterIndex]

            if(selected[parentChance] === 'uppercase'){
                pass += randomChar.toUpperCase()
            }else if(selected[parentChance] === 'lowercase'){
                pass += randomChar
            }else if(selected[parentChance] === 'numbers'){
                let randomNumIndex = Math.round(Math.random() * numbersArray.length)
                randomNumIndex === numbersArray.length && randomNumIndex--
                pass += numbersArray[randomNumIndex]
            }else if(selected[parentChance] === 'symbols'){
                let randomSymbolIndex = Math.round(Math.random() * symbolsArray.length)
                randomSymbolIndex === symbolsArray.length && randomSymbolIndex--
                pass += symbolsArray[randomSymbolIndex]
            }else{
                break
            }
        }

        pass.length !== 0 && handlePassLevel(pass)
    }

    const handleViewBackground = (view:string) => {
        switch(view){
            case 'easy':
                if(level >= 1) return 'green'
            case 'medium':
                if(level >= 2) return 'yellow'
            case 'strong':
                if(level >= 3) return 'orange'
            case 'vstrong':
                if(level === 4) return 'red'
        }
    } 

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.passwordGeneratorContainer}>
        <View style={{ height: '10%', justifyContent: 'center' }}>
            <Text style={[styles.header, {fontFamily: 'Maitree'}]}>
                Password Generator
            </Text>
        </View>
        <View style={[styles.generated]}>
            <Text selectable={true} style={{ color: '#fff' }}>
                {
                    generated === '' ? 'P4$5W0rD!' : generated
                }
            </Text>
        </View>
        <View style={styles.properties}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{ fontFamily: 'Maitree', color: '#fff' }}>
                        Character Length
                    </Text>
                    <Text style={{ fontFamily: 'Maitree', color: '#A6FAB2' }}>
                        {sliderValue}
                    </Text>
                </View>
                <Slider 
                    minimumValue={6}
                    maximumValue={30}
                    onValueChange={(e:any) => {
                        setSliderValue(Math.floor(parseFloat(e)))
                    }}
                    value={sliderValue}
                />
                  <FlatList 
                    contentContainerStyle={{ gap: 10 }}
                    data={passwordProperties}
                    renderItem={({item}) => (
                        <BouncyCheckbox 
                        text={item}
                        textStyle={{
                            textDecorationLine: 'none',
                            color: '#fff',
                            fontFamily: 'Maitree'
                        }}
                        innerIconStyle={{
                            borderRadius: 0,
                            borderColor: '#fff',
                            width: 20,
                            height: 20                         
                        }}
                        fillColor={'none'}
                        onPress={() => {
                           dispatch({
                            type: `SET_${item.split(' ')[1].toUpperCase()}`
                           })}
                        }
                        />
                    )}
                  />
                <View style={styles.passwordStrength}>
                    <View style={{ flex: 2 }}>
                        <Text style={{
                            color: '#fff',
                            fontFamily: 'Maitree'
                        }}>
                            STRENGTH
                        </Text>
                    </View>
                    <View style={{ width: '60%', flexDirection: 'row', gap: 5 }}>
                        <Text style={{ flex: 1, color: '#fff', fontFamily: 'Maitree', textAlign: 'right' }}>
                            {
                                level === 1 && 'Easy to break'
                            }
                            {
                                level === 2 && 'Medium'
                            }
                            {
                                level === 3 && 'Strong'
                            }
                            {
                                level === 4 && 'Very Strong'
                            }
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
                            <View style={{ backgroundColor: handleViewBackground('easy'), flex: 1, borderWidth: 1, borderColor: '#fff' }} />
                            <View style={{ backgroundColor: handleViewBackground('medium'), flex: 1, borderWidth: 1, borderColor: '#fff' }} />
                            <View style={{ backgroundColor: handleViewBackground('strong'), flex: 1, borderWidth: 1, borderColor: '#fff' }} />
                            <View style={{ backgroundColor: handleViewBackground('vstrong'), flex: 1, borderWidth: 1, borderColor: '#fff' }} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.generateButton} onPress={handleGeneratePassword}>
                    <Text style={{ fontFamily: 'Maitree', textAlign: 'center' }}>
                        GENERATE {'->'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Index