import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import data from "../data";
import Accordion from "react-native-collapsible/Accordion";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-elements";
export default function Home(navigation,route) {

  const [activeSections, setActiveSections] = React.useState([]);

  const [datas, setDatas] = React.useState([]);
  


  const completeJob = async (id) => {
     try {
      const response = await fetch('https://localhost:5001/api/swabjob/complete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${global.theToken}`
        },
        body: JSON.stringify({
          jobId: id
        }),
      });
      const {error} = response.json();
      alert(error)
    } catch (e) {
      console.log(e);
      alert(e)

    }
  };
  const getJobs = async () => {
 
    try {
      const response = await fetch('https://localhost:5001/api/swabJobs/forMe', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${global.theToken}`
        }
      });
      if(response.ok){
        const datas = response.json();
        if(datas.length==0){
          alert("No avaliable Jobs..")
        }else{
          sent(datas)
        }
      }else{
        const {error}=response.json()
        alert(error)
      }
      
    } catch (e) {
      console.log(e);
      alert(e)
    }
  };
  const acceptJob = async (id) => {
    console.log("Accept "+ global.deneme);
    try {
      const response = await fetch('https://localhost:5001/api/swabJobs/accept', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${global.theToken}`
        },
        body: JSON.stringify({
          jobId: id
        }),
      });
      if(response.ok){
        alert("The job is accepted succesfully..")
      }else{
        const {error}=response.json()
        alert(error)
      }
      
    } catch (e) {
      console.log(e);
      alert("accept"+e)

    }
  }
  _renderHeader = section => {
    return (
      <View style={styles.button}>
        <Text style={styles.text}>
          {section.firstname} {section.lastname}
        </Text>
        {section.ok ? (
          <FontAwesome name="check" size={25} color="green" />
        ) : (
          <FontAwesome name="flag-checkered" size={25} color="red" />
        )}
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.text}> STR : {section.streetAndNumber}</Text>
        <Text style={styles.text}> PLZ : {section.zipCode}</Text>
        <Text style={styles.text}> STADT : {section.city}</Text>
        {!section.ok ? (
          <Button buttonStyle={{ padding: 14 }} title="Get Job" onPress={()=>acceptJob(section.id)} />
        ) : (
          <Button buttonStyle={{ padding: 14 }} title="I complete job" onPress={()=>completeJob(section.id)} />
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <Accordion
        sections={data}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        sectionContainerStyle={styles.section}
        onChange={index => {
          setActiveSections(index);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#E4E4E4",
    backgroundColor: "white"
  },
  text: {
    fontSize: 16,
    margin: 10
  },
  textContainer: {
    margin: 20
  },
  button: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  section: {
    borderColor: "black",
    borderWidth: 2
  },
  buttonStyle: {
    padding: 3
  }
});
