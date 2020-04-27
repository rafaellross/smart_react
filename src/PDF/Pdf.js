import React, { Component } from 'react';

import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    margin: 20
    
  },
  section: {
        
    display: "flex"       

  },
  doubleLine: {
    height: '40.5px'
  }
});

// Create Document Component
const Pdf = () => (
  <PDFViewer width="100%" style={{height: '100vh'}} >
    <Document title="QA">
      <Page size="A4" style={styles.page} orientation="landscape">
      <Image src="img/logo.jpg" style={{position: 'absolute', width: '50%', zIndex:'1', opacity: '0.45', left: '25%', top: '20%'}}/>
        <View>
          <View style={{display: "block", flexDirection: "row"}}>
            <View>
              <Text
                style={{borderStyle: 'solid', borderColor: 'black', borderWidth: '1', width: '350px'}}
                
                >Smart Plumbing Solutions Pty Ltd</Text>
            </View>
            <View style={styles.section}>
              <Text 
                style={{borderStyle: 'solid', borderColor: 'black', borderWidth: '1', width: '210px', textAlign: "center"}}            
                >deck work</Text>          
            </View>
            <View style={styles.section}>
              <Text 
                style={{borderStyle: 'solid', borderColor: 'black', borderWidth: '1', width: '210px', textAlign: "center"}}            
                >Q.A Sign Off</Text>          
            </View>
          </View>

          <View style={{display: "block", flexDirection: "row"}}>
            <View>
              <Text
                style={{borderStyle: 'solid', borderColor: 'black', borderWidth: '1', width: '450px'}}
                
                >Revision No: 1</Text>
            </View>
            <View style={styles.section}>
              <Text 
                style={{borderStyle: 'solid', borderColor: 'black', borderWidth: '1', width: '320px'}}            
                >Date of Update: 27/04/2020</Text>          
            </View>
          </View>

          <View style={{display: "block", flexDirection: "row"}}>
            <View>
              <Text
                style={{borderStyle: 'solid', borderColor: 'black', borderLeftWidth: '1', borderBottomWidth: '1', width: '75px', ...styles.doubleLine}}                
                >Project:</Text>
            </View>
            <View style={styles.section}>
              <Text 
                style={{borderStyle: 'solid', borderColor: 'black',marginLeft: '0', paddingLeft: '0', borderRightWidth: '1', borderBottomWidth: '1', width: '200px',  ...styles.doubleLine}}            
                >609 - Russell Ave Dolls Point (Helm)</Text>          
            </View>
            <View style={styles.section}>
              <Text 
                style={{borderStyle: 'solid', borderColor: 'black',marginLeft: '0', paddingLeft: '0', borderRightWidth: '1', borderBottomWidth: '1', width: '200px',  ...styles.doubleLine}}            
                >Customer:</Text>          
            </View>
            
          </View>          
        </View>
      </Page>
    </Document>
  </PDFViewer>
);



export default Pdf;