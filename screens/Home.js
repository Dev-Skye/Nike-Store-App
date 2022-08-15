import {BlurView} from "expo-blur";
import {Svg, Polygon} from "react-native-svg";
import React , {useState} from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal} from "react-native";
import { COLORS, images, icons, SIZES, FONTS } from "../constants";
import  { Paystack }  from 'react-native-paystack-webview';
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";

const Home = () => {
    
const [showAddToBagModal, setShowAddToBagModal] = React.useState(false)
const [selectedItem, setSelectedItem] = React.useState(null)
const [selectedSize, setSelectedSize] = React.useState("")
    //Dummy Data
    const [trending, setTrending] = React.useState([
        {
            id: 0,
            name: "Nike Air Zoom",
            img: images.shoe1,
            bgColor: "#8D021F",
            type: "RUNNING",
            price: "#9,000",
            sizes: [6, 7, 8, 9, 10]
        },
        {
            id: 1,
            name: "Nike Metcon",
            img: images.shoe2,
            bgColor: "#F19700",
            type: "TRAINING",
            price: "#9,050",
            sizes: [6, 7, 8, 9, 10, 11]
        },
        {
            id: 2,
            name: "Nike Air Zoom ",
            img: images.shoe7,
            bgColor: "#00bfff",
            type: "BASKETBALL",
            price: "#11,000",
            sizes: [6, 7, 8, 9]
        }
    ]);

    const [recentlyViewed, setRecentlyViwed] = React.useState([
        {
            id: 0,
            name: "Nike Metcon 4",
            img: images.sie1,
            bgColor: "#CC5500",
            type: "TRAINING",
            price: "#8,000",
            sizes: [6, 7,8,9,10]
        },
        {
            id: 1,
            name: "Nike Metcon 6",
            img: images.sie2,
            bgColor: "#BEBEBE",
            type: "TRAINING",
            price: "#12,000",
            sizes: [6, 7,8,9, 10, 11]
        },
        {
            id: 2,
            name: "Nike Metcon 5",
            img: images.sie3,
            bgColor: "#8B0000",
            type: "TRAINING",
            price: "#11,000",
            sizes: [6, 7, 8, 9]
        },
        {
            id: 3,
            name: "Nike Metcon 3",
            img: images.sie4,
            bgColor: "#136207",
            type: "TRAINING",
            price: "#9,600",
            sizes: [6, 7, 8, 9, 10]
        },
        {
            id: 4,
            name: "Nike Metcon 9",
            img: images.sie5,
            bgColor: "#8CBF1C",
            type: "TRAINING",
            price: "#8,000",
            sizes: [6, 7,8, 9, 10]
        },
    ])
    //Render
    function renderTrendingShoes(item, index){

        var trendingStyle = {};
        if (index == 0) {
            trendingStyle = {marginLeft: SIZES.padding}
        }
            return (
                <TouchableOpacity
                    style={{height: 250, width: 200, justifyContent: "center", marginHorizontal: SIZES.base, ...trendingStyle}}
                    onPress={() => {
                        setSelectedItem(item)
                        setShowAddToBagModal(true)
                    }}
                >
                    <Text style={{color: COLORS.gray, ...FONTS.h5}}>{item.type}</Text>
                    <View style={[{
                        flex: 1,
                        justifyContent: "flex-end",
                        marginTop: SIZES.base,
                        borderRadius: 10,
                        marginRight: SIZES.padding,
                        paddingLeft: SIZES.radius,
                        paddingRight: SIZES.padding,
                        paddingBottom: 25,
                        backgroundColor: item.bgColor
                    }, styles.trendingShadow]}>
                        <View style={{height: "15%", justifyContent: "space-between"}}>
                            <Text style={{color: COLORS.white, ...FONTS.body4}}>{item.name}</Text>
                            <Text style={{color: COLORS.white, ...FONTS.h3}}> {item.price}</Text>
                        </View>

                    </View>

                    <View style={{position: "absolute", left: 20, width: "200%", height: "80%"}}>
                        <Svg height="100%" width="100%">
                            <Polygon
                                points="0,0 160, 0 160, 80"
                                fill="white"
                            />
                        </Svg>
                    </View>
                    <Image
                    source={item.img}
                    resizeMode = "cover"
                    style={{
                        position: "absolute",
                        top: 40,
                        left: 2,
                        right:-10,
                        width: "120%",
                        height: 150,
                        
                    }}
                    />

                </TouchableOpacity>
            )
    }

    function renderRecentlyViewed(item, index){
        return (
            <TouchableOpacity
                style={{flex: 1, flexDirection: "row"}}
                onPress={() => {
                    setSelectedItem(item)
                    setShowAddToBagModal(true)
                }}
            >
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Image
                        source={item.img}
                        resizeMode="contain"
                        style={{
                            width: 140,
                            height: 120,
                            marginLeft: 30,
                            
                        }}
                    />
                </View>
                <View style={{flex: 1.5, marginLeft: 30, justifyContent: "center"}}>
                        <Text style={{color: COLORS.gray, ...FONTS.body3}}>{item.name}</Text>
                        <Text style={{...FONTS.h3, fontWeight: "bold"}}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    function renderShoeSizes() {
        return(
            selectedItem.sizes.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: 35, 
                            height: 25, 
                            alignItems: "center", 
                            justifyContent: "center", 
                            marginHorizontal: 5, 
                            marginBottom: 10,
                            borderWidth: 1, 
                            backgroundColor: selectedItem.sizes[index] == selectedSize ? COLORS.white : null,
                            borderColor: COLORS.white, 
                            borderRadius: 5
                        }}
                        onPress={() => {
                            setSelectedSize(item)
                        }}
                    >
                        <Text style={{color: selectedItem.sizes[index] == selectedSize ? COLORS.black : COLORS.black, ...FONTS.body4}}>{item}</Text>
                    </TouchableOpacity>
                )
            })
        )
    }

    function makePayment(){
        return (
            <View style={{ flex: 1 }}>
              <Paystack  
                paystackKey="your-public-key-here"
                amount={selectedItem.price}
                buttonText="Pay Now"
                showPayButton={true}
                billingMobile="+234 75066776"
                billingEmail="joyskye9@gmail.com"
                activityIndicatorColor="green"
                onCancel={(e) => {
                  // handle response here
                }}
                onSuccess={(res) => {
                  // handle response here
                }}
                autoStart={true}
              />
            </View>
          );
    }

    return (  

        <View style={styles.container}>
            <Text style={{marginTop: SIZES.radius, marginHorizontal: SIZES.padding, ...FONTS.largeTitleBold}}>TRENDING</Text>
        
        {/* Trending */}
        <View style={{height: 260, marginTop: SIZES.radius}}>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trending}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => renderTrendingShoes(item, index)}
            />
        </View>
        {/*Recently viewed*/}

        <View style={[{
            flex: 1,
            flexDirection: "row",
            marginTop: SIZES.padding,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: COLORS.white,

        }, styles.recentContainerShadow]}>
                <View
                    style={{
                        width: 70, marginLeft: SIZES.base 
                    }}
                >
                    <Image
                        source={images.recentlyViewedLabel}
                        resizeMode="contain"
                        style={{
                            marginTop: 60,
                            width:"100%",
                            height:"70%",
                        }}
                    />
                </View>
                <View style={{flex: 1, paddingBottom: SIZES.padding}}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={recentlyViewed}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item, index}) => renderRecentlyViewed(item, index)}
                        />
                </View>
        </View>

        {/*Modal*/}
        {selectedItem &&
        <Modal
            animationType = "slide"
            transparent={true}
            visible={showAddToBagModal}
        >
            <BlurView 
            style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            tint="dark"
            intensity={80}
            
            >
                {/*To close modal*/}
                <TouchableOpacity
                    style={styles.absolute}
                    onPress={() => {
                        setSelectedItem(null)
                        setSelectedSize("")
                        setShowAddToBagModal(false)
                    }}
                >
                    {/*Modal Content*/}
                    
                </TouchableOpacity>
                <View style={{justifyContent: "center", width: "85%", height: "50%", backgroundColor: selectedItem.bgColor,  }}>
                        <View style={{alignItems: "center", justifyContent: "center", }}>
                            <Image
                                source={selectedItem.img}
                                resizeMode="contain"
                                style={{
                                    width: "110%",
                                    height: "120%",
                                    marginVertical:-250,
                                    marginLeft: 20,
                                    marginBottom: -35,
                                    transform:[
                                        {rotate: "-15deg"}
                                    ]
            
                                
                                }}
                            />
                            </View>
                        <Text style={{marginTop: -70,  marginHorizontal: SIZES.padding, color: COLORS.white, ...FONTS.body2}}>{selectedItem.name}</Text>
                        <Text style={{marginTop: SIZES.base / 2, marginHorizontal: SIZES.padding, color: COLORS.white, ...FONTS.body3}}>{selectedItem.type}</Text>
                        <Text style={{marginTop: SIZES.radius, marginHorizontal: SIZES.padding, color: COLORS.white, ...FONTS.h1}}>{selectedItem.price}</Text>
                        
                                <View style={{flexDirection: "row", marginTop: SIZES.radius, marginHorizontal: SIZES.padding}}>
                                    <View>
                                    <Text style={{color: COLORS.white, ...FONTS.body3,  marginHorizontal: SIZES.padding, }}>Select Size</Text>
                                    </View>
                                    <View style={{flex: 1, flexWrap: "wrap", flexDirection: "row", marginLeft: SIZES.radius}}>
                                            {renderShoeSizes()}
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        height: 70,
                                        marginTop: SIZES.base,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(0,0,0,0.5)"
                                    }}
                                    onPress={() => {
                                        // setSelectedItem(null)
                                        // setSelectedSize("")
                                        // setShowAddToBagModal(false)
                                        makePayment()
                                    }}
                                >
                                    <Text style={{color: COLORS.white, ...FONTS.largeTitleBold,}}>Add to Bag</Text>
                                </TouchableOpacity>
                    </View>
            </BlurView>
        </Modal>
        }
        </View>
    )
    }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    }, 
    recentContainerShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    absolute:{
        position: "absolute",
        top: 0, 
        left: 0,
        right: 0,
        bottom: 0
    },
    trendingShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
})
export default Home;