import React from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native'
import OrderBook from '../components/OrderBook'

export default ({ }) => {
    return (
        <SafeAreaView style={styles.contentContainer}>
            <Text style={styles.mainText}>
                Sorry for the poor design, I took my time in reading the websockt and how bitfinex works
            </Text>

            <OrderBook symbol='tBTCUSD' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'rgb(20,35,48)'
    },
    mainText: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 24,
        color: 'white'
    }
})