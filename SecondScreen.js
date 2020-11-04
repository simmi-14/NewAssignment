
import React from 'react';
import {
    KeyboardAvoidingView,
    StatusBar,
    Text,
    View, FlatList, ActivityIndicator, Image, Modal, TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { setAllData, setLoadingg, setModalData } from "./utility/Store";

const mapStateToProps = (state) => {
    return {
        loadingg: state.loadingg,
        all_data: state.all_data,
        modal_data: state.modal_data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingg(loadingg) {
            dispatch(setLoadingg(loadingg))
        },
        setAllData(all_data) {
            dispatch(setAllData(all_data))
        },
        setModalData(modal_data) {
            dispatch(setModalData(modal_data))
        },
    }
}

class SecondScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.getDataa()
    }

    getDataa = async () => {
        this.props.setLoadingg(true);
        try {
            fetch("https://swapi.dev/api/people", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(async (data) => {
                    this.props.setLoadingg(false);
                    this.props.setAllData(data.results);
                })
                .catch((err) => {
                    this.props.setLoadingg(false)
                    console.log("Error fetching data" + err);

                })
        } catch (error) {
            this.props.setLoadingg(false)
            console.log("Error fetching data again" + error);

        }
    }
    
    render() {
        return (
            <View style={{flex:1}} >
                {!this.props.loadingg
                    ?

                    (<FlatList
                            data={this.props.all_data}
                            keyExtractor={(item) => item.name.toString()}
                            renderItem={({ item, index, separators }) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => this.props.setModalData(item)}>
                                    <View key={item.name} style={{ flex: 1, flexDirection: 'row', margin: 8, padding: 8, alignItems: "center" }}>
                                        <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&usqp=CAU' }} />
                                        <Text style={{fontSize:18, padding:4, marginLeft:8}}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />)
                    :
                        (<View style={{ flex: 1, justifyContent: "center", marginTop:18 }}>
                            <ActivityIndicator size="large" color="grey" />
                        </View>)
                }
                <Modal animationType={"slide"} transparent={false}
                    visible={this.props.modal_data ? true : false}
                    transparent={true}
                    onRequestClose={() => { this.props.setModalData('') }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: "rgba(0,0,0,0.2)" }}>
                        <View style={{ flexDirection: 'column', backgroundColor: '#fff', margin: 8, padding: 16, paddingTop: 32, paddingBottom: 32, borderRadius: 6 }}>
                            <Text>{JSON.stringify(this.props.modal_data)}</Text>
                            <TouchableOpacity style={{alignItems:'center', backgroundColor:'grey', padding:6, borderRadius:4, margin:16, justifyContent:'center', alignSelf:'center'}} onPress={() => {
                                this.props.setModalData('');
                            }}>
                                <Text style={{fontSize:16, color:'white'}}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen);