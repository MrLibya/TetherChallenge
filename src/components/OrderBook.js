import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { ws } from '../webSocket'
import { OPENED } from '../constantes/webSocketConstantes'

export default ({ symbol }) => {
    const { subscribes, book, status, psnap } = useSelector(state => state.webSocket)
    // console.log("book ", book)

    React.useEffect(() => {
        if (status === OPENED) {
            ws.send(JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol,
                // prec: "R0",
                // len: 25
            }));
        }
        return () => {
            if (subscribes[symbol]?.chanId) {
                ws.send(JSON.stringify({
                    event: 'unsubscribe',
                    chanId: subscribes[symbol].chanId,
                }));
            }
        }
    }, [status])


    // I didn't use flatlist here because i run out of time
    return (
        <ScrollView style={styles.contentContainer}>
            <View style={styles.rowContainer}>
                <View style={styles.row}>
                    <Text style={[styles.headerText, styles.flex2]}>AMOUNT</Text>
                    <Text style={styles.headerText}>PRICE</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.headerText, styles.flex2]}>PRICE</Text>
                    <Text style={styles.headerText}>AMOUNT</Text>

                </View>
            </View>
            {psnap.bids.map((price, i) => (
                <View key={i}>
                    <View style={styles.rowContainer} >
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.flex2]}>{book.bids[price].amount}</Text>
                            <Text style={styles.text}>{price}</Text>
                        </View>
                        <View style={[styles.row, { marginLeft: 3 }]}>
                            <Text style={[styles.text, styles.flex2]}>{book.asks[psnap.asks[i]]?.amount}</Text>
                            <Text style={styles.text}>{psnap.asks[i]}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'rgb(28,43,59)',
        padding: 13,
        width: '100%',
        alignSelf: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    headerText: {
        color: 'rgb(164,171,177)',
        flex: 1,
        // fontSize: 32
    },
    text: {
        color: 'white'
    },
    flex2: {
        flex: 2
    },
    divider: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 8
        // height: 10
    }
})