import { Pressable, View, Text, StyleSheet } from "react-native";

const PrimaryButton = function({onPress, children, styleOptions = {}}){
    return (
        <View style={
            {
                ...styles.buttonContainer, 
                backgroundColor: styleOptions.backgroundColor ?? "white",
                margin: styleOptions.margin ?? 0,
                borderWidth: styleOptions.borderWidth ?? 2,
                borderColor: styleOptions.borderColor ?? "black",
                borderRadius: styleOptions.borderRadius ?? 15,
            }
        }>
        {/*adding the ability to dynmaically add width as a prop*/}
            <Pressable
            onPress={onPress}
            style={
                {
                    ...styles.pressableArea, 
                    width: styleOptions.width ?? 100,

                }
            }
            android_ripple={{borderless:true}}>
                <Text style={
                    {
                        fontSize: styleOptions.fontSize ?? 16,
                        fontWeight: "bold", 
                        color: styleOptions.color ?? "black",
                        textAlign: "center"
                    }
                }>
                {children ?? "Button"}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
    },
    pressableArea: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default PrimaryButton;