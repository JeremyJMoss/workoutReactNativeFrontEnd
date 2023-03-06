import {View, StyleSheet, Text, ActivityIndicator} from "react-native";
import { useEffect, useState } from "react";
import CloseButton from "../../../UIElements/CloseButton";
import SignupPage1 from "./SignupPages/SignupPage1";
import SignupPage2 from "./SignupPages/SignupPage2";
import PrimaryButton from "../../../UIElements/PrimaryButton";
import { colors } from "../../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { sendSignupData, setErrorMessage, resetFields, resetFetchStatus, resetErrorMessage} from "../../../../config/reducers/signupReducer";

const Signup = ({setPage}) => {
    const dispatch = useDispatch();
    const [signupSection, setSignupSection] = useState(1);
    const {signupData, fetchStatus, errorMessage} = useSelector((state) => state.signup);

    useEffect(() => {
        if (fetchStatus !== "success") return;
        setPage("login");
        dispatch(resetFetchStatus());
    }, [fetchStatus])

    useEffect(() => {
        if (!errorMessage) return;
        
        setTimeout(() => {
            if (fetchStatus == "error"){
                dispatch(resetFetchStatus());
            }
            dispatch(resetErrorMessage());
        }, 2500)
    }, [errorMessage])

    const nextPageHandler = () => {
        setSignupSection((cur) => ++cur);
    }

    const prevPageHandler = () => {
        setSignupSection((cur) => --cur);
    }

    const submitHandler = () => {
        if (Object.values(signupData).some((value) => value === "")){
            dispatch(setErrorMessage({value:"All fields are required"}));
            return;
        }
        dispatch(sendSignupData(signupData));
        dispatch(resetFields());
    }

    return (
        <View style={styles.window}>
            <CloseButton onPress={() => setPage("buttons")}/>
            {errorMessage && <View style={styles.banner}><Text style={styles.error}>{errorMessage}</Text></View>}
            <View style={styles.container}>
                {fetchStatus == "loading" && <ActivityIndicator size="large" color={colors.SECONDARYACCENTTINT}/>}
                {fetchStatus == "success" && <View style={{alignItems:"center"}}><Text style={{fontSize: 20}}>Success</Text></View>}
                {signupSection === 1 && !fetchStatus && <SignupPage1/>}
                {signupSection === 2 && !fetchStatus && <SignupPage2/>}
            </View>
            {   signupSection !== 1 && 
            <View style={styles.prevButtonContainer}>
                <PrimaryButton styleOptions={styles.prevButton} onPress={prevPageHandler}>Back</PrimaryButton>
            </View>
            }
            <View style={styles.nextButtonContainer}>
                {signupSection === 1 && !fetchStatus
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
    banner: {
        position: "absolute",
        top: 12,
        width:"100%",
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: "#111"
    },
    error: {
        fontSize: 20,
        color: colors.ACCENTTINT,
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