import {View, StyleSheet, Text} from "react-native";
import { useState } from "react";
import CloseButton from "../../../UIElements/closeButton";
import SignupPage1 from "./SignupPages/SignupPage1";
import SignupPage2 from "./SignupPages/SignupPage2";
import PrimaryButton from "../../../UIElements/PrimaryButton";
import { colors } from "../../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { sendSignupData } from "../../../../config/reducers/signupReducer";

const Signup = ({setPage}) => {
    const dispatch = useDispatch();
    const [signupSection, setSignupSection] = useState(1);
    const {signupData, fetchStatus} = useSelector((state) => state.signup);

    const nextPageHandler = () => {
        setSignupSection((cur) => ++cur);
    }

    const prevPageHandler = () => {
        setSignupSection((cur) => --cur);
    }

    const submitHandler = () => {
        dispatch(sendSignupData(signupData));
    }

    return (
        <View style={styles.window}>
            <CloseButton onPress={() => setPage("buttons")}/>
            <View style={styles.container}>
                {signupSection === 1 && !fetchStatus && <SignupPage1/>}
                {signupSection === 2 && !fetchStatus && <SignupPage2/>}
                {fetchStatus && <Text>{fetchStatus}</Text>}
            </View>
            {   signupSection !== 1 && 
            <View style={styles.prevButtonContainer}>
                <PrimaryButton styleOptions={styles.prevButton} onPress={prevPageHandler}>Back</PrimaryButton>
            </View>
            }
            <View style={styles.nextButtonContainer}>
                {signupSection === 1 
                ? <PrimaryButton styleOptions={styles.nextButton} onPress={nextPageHandler}>Next</PrimaryButton> 
                :<PrimaryButton styleOptions={styles.nextButton} onPress={submitHandler}>Submit</PrimaryButton>}
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