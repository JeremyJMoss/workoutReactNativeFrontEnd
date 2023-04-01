import { View, Text, StyleSheet } from "react-native";
import ToggleButton from "./ToggleButton";
import { colors, MONTHS } from "../../config/config";
import { isYesterday, isToday, isTomorrow } from "../../config/helper/helper";
import { moveForwardDate, moveBackwardDate } from "../../config/reducers/dateReducer";
import { useDispatch, useSelector } from "react-redux";

const DateScroll = () => {
    const dispatch = useDispatch();
    const dateString = useSelector((state) => state.date.date);
    const date = new Date(dateString);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    let dateTitle;

    if (isToday(date)){
        dateTitle = "Today";
    }
    else if (isYesterday(date)){
        dateTitle = "Yesterday";
    }
    else if (isTomorrow(date)){
        dateTitle = "Tomorrow";
    }
    else{
        dateTitle = `${day} ${month} ${year}`;
    }

    return (
    <View style={styles.container}>
        <ToggleButton 
        iconSize={30} 
        iconName="arrow-back-outline" 
        iconColor={colors.PRIMARYWHITE}
        onPress={() => {
            dispatch(moveBackwardDate());
        }} />
            <Text style={styles.title}>{dateTitle}</Text>
        <ToggleButton 
        iconSize={30} 
        iconName="arrow-forward-outline" 
        iconColor={colors.PRIMARYWHITE}
        onPress={() => {
            dispatch(moveForwardDate());
        }}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingBottom: 20
    },
    title: {
        color: colors.PRIMARYWHITE,
        fontSize: 20
    }
})

export default DateScroll;