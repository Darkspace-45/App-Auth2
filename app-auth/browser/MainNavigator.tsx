import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import RestablecerScreen from "../screens/RestablecerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CamaraScreen from "../screens/CamaraScreen";
import GaleriaScreen from "../screens/GaleriaScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={() => ({ headerShown: false })} />
            <Stack.Screen name="Register" component={RegisterScreen} options={() => ({ headerShown: false })} />
            <Stack.Screen name="Welcome" component={Mytabs} />
            <Stack.Screen name="Restablecer" component={RestablecerScreen} />

        </Stack.Navigator>
    );
}


function Mytabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            <Tab.Screen name="Galeria" component={GaleriaScreen} />
            <Tab.Screen name="Camara" component={CamaraScreen} />
        </Tab.Navigator>
    )
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}