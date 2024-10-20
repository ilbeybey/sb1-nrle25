import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { Http } from "@nativescript/core";

type CountryDetailScreenProps = {
    route: RouteProp<MainStackParamList, "CountryDetail">,
    navigation: FrameNavigationProp<MainStackParamList, "CountryDetail">,
};

type Country = {
    id: string;
    name: string;
    image: string;
    description: string;
};

export function CountryDetailScreen({ route }: CountryDetailScreenProps) {
    const { countryId } = route.params;
    const [country, setCountry] = React.useState<Country | null>(null);

    React.useEffect(() => {
        Http.getJSON<Country>(`http://localhost:3000/api/countries/${countryId}`)
            .then(setCountry)
            .catch(error => console.error("Error fetching country details:", error));
    }, [countryId]);

    if (!country) {
        return <activityIndicator busy={true} />;
    }

    return (
        <scrollView style={styles.container}>
            <image src={country.image} style={styles.image} />
            <label style={styles.text}>
                {country.description}
            </label>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    image: {
        width: "100%",
        height: 200,
    },
    text: {
        fontSize: 16,
        color: "#333333",
        textAlignment: "left",
        padding: 20,
    },
});