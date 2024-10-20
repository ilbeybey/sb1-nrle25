import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { Http } from "@nativescript/core";

type CountryListScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "CountryList">,
};

type Country = {
    id: string;
    name: string;
};

export function CountryListScreen({ navigation }: CountryListScreenProps) {
    const [countries, setCountries] = React.useState<Country[]>([]);

    React.useEffect(() => {
        Http.getJSON<Country[]>("http://localhost:3000/api/countries")
            .then(setCountries)
            .catch(error => console.error("Error fetching countries:", error));
    }, []);

    return (
        <scrollView style={styles.container}>
            {countries.map((country) => (
                <button
                    key={country.id}
                    style={styles.countryButton}
                    onTap={() => navigation.navigate("CountryDetail", { countryId: country.id })}
                >
                    {country.name}
                </button>
            ))}
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    countryButton: {
        fontSize: 18,
        color: "#333333",
        backgroundColor: "#ffffff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
});