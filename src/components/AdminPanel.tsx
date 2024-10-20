import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { ListView, TextField, Button } from "@nativescript/core";

type AdminPanelProps = {
    navigation: FrameNavigationProp<MainStackParamList, "AdminPanel">,
};

type Country = {
    id: string;
    name: string;
    image: string;
    description: string;
};

export function AdminPanel({ navigation }: AdminPanelProps) {
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [newCountry, setNewCountry] = React.useState<Country>({ id: '', name: '', image: '', description: '' });

    React.useEffect(() => {
        // Fetch countries from API
        // This is a placeholder. In a real app, you'd use your actual API endpoint
        fetch('http://your-api-endpoint/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const addCountry = () => {
        // Add new country to API
        // This is a placeholder. In a real app, you'd use your actual API endpoint
        fetch('http://your-api-endpoint/countries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCountry),
        })
            .then(response => response.json())
            .then(data => {
                setCountries([...countries, data]);
                setNewCountry({ id: '', name: '', image: '', description: '' });
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold">Admin Panel</label>
            
            <label>Add New Country</label>
            <TextField
                hint="ID"
                text={newCountry.id}
                onTextChange={(args) => setNewCountry({...newCountry, id: args.value})}
            />
            <TextField
                hint="Name"
                text={newCountry.name}
                onTextChange={(args) => setNewCountry({...newCountry, name: args.value})}
            />
            <TextField
                hint="Image URL"
                text={newCountry.image}
                onTextChange={(args) => setNewCountry({...newCountry, image: args.value})}
            />
            <TextField
                hint="Description"
                text={newCountry.description}
                onTextChange={(args) => setNewCountry({...newCountry, description: args.value})}
            />
            <Button text="Add Country" onTap={addCountry} />

            <label>Country List</label>
            <ListView
                items={countries}
                itemTemplate={(item) => {
                    return (
                        <label>{item.name}</label>
                    );
                }}
            />
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        padding: 20,
    },
});