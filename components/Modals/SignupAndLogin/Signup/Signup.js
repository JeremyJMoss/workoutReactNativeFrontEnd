import {View, StyleSheet} from "react-native";
import { useState } from "react";
import CloseButton from "../../../UIElements/closeButton";
import SignupPage1 from "./SignupPages/SignupPage1";
import PrimaryButton from "../../../UIElements/PrimaryButton";
import { colors } from "../../../../config/config";

const Signup = ({setPage}) => {
    const [signupSection, setSignupSection] = useState(1);
    const [signupData, setSignupData] = useState({});

    const nextPageHandler = () => {
        setSignupSection((cur) => ++cur);
    }

    const prevPageHandler = () => {
        setSignupSection((cur) => --cur);
    }

    return (
        <View style={styles.window}>
            <CloseButton onPress={() => setPage("buttons")}/>
            <View style={styles.container}>
                {signupSection === 1 && <SignupPage1/>}
            </View>
            <View style={styles.prevButtonContainer}>
                {signupSection !== 1 && <PrimaryButton styleOptions={styles.prevButton} onPress={prevPageHandler}>Back</PrimaryButton>}
            </View>
            <View style={styles.nextButtonContainer}>
                <PrimaryButton styleOptions={styles.nextButton} onPress={nextPageHandler}>Next</PrimaryButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "100%",
        height: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
    },
    container:{
        height: "90%",
        width: "75%",
        justifyContent: "space-evenly"
    },
    prevButtonContainer: {
        position: "absolute",
        bottom: 15,
        left: 15
    },
    prevButton: {
        borderRadius: 20,
    },
    nextButtonContainer: {
        position: "absolute",
        bottom: 15,
        right: 15
    },
    nextButton: {
        backgroundColor: colors.SECONDARYACCENTTINT,
        color: colors.ACCENTTINT,
        borderRadius: 20,
    }
})

export default Signup;