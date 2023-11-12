import React, { useState, useEffect, Fragment, Children } from "react";
import { PDFViewer,Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useAuthStore } from "../../VariblesStore";



const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 10,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  section: {
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  title2: {
    fontSize: 12,
    fontWeight: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
 
  row: {
    marginBottom: 5,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
    paddingTop: 5,
  },
  rowItens: {
    marginBottom: 5,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    paddingBottom: 5,
    paddingTop: 5,
  },
  rowItensePagina: {
    marginBottom: 5,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    paddingBottom: 5,
    paddingTop: 5,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
    marginRight: 10,
  },
    preciosColumna: {
      alignItems: 'flex-end',
    },
    detalleFila: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    piePagina: {
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    flexGrow: 1,
      textAlign: 'center',
    },
});

const Facturacion = ({ datosFactura,datosFacturaDetalle, showPDF, setShowPDF,montoPago }) => {
 //console.log(datosFacturaDetalle)
  //console.log(datosFactura)
  const isMobile = navigator.userAgent.match(/Mobi/);

  return (
    
    <div>
      <Fragment>
      <div>
              <PDFViewer width="100%" height="600px">
                {facturaPDF(datosFactura, datosFacturaDetalle)}
              </PDFViewer>
            </div>

      </Fragment>
  </div>
  

  //   <div>
  //     {isMobile ? (
  //       <p>Lo siento, la factura no se puede ver en dispositivos móviles.</p>
  //     ) : (!montoPago || montoPago === 0) ? (
  //       <div>
  //   {/* <p>Por favor ingrese el monto de la moneda de pago.</p> */}
  //   <button disabled className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
  //    >
  //     Pagar
  //   </button>
  // </div>
  //     ) : showPDF ? (
  //       //console.log("hola")
  //       <>hola</>
  //       // <PDFViewer width="100%" height="600px">
  //       //   {facturaPDF(datosFactura, datosFacturaDetalle, montoPago)}
  //       // </PDFViewer>
  //     ) : (
  //       <div>
  //         <div
  //           className="bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-green-600 transition duration-300 ease-in-out"
  //           onClick={() => setShowPDF(!showPDF)}
  //         >
  //           Pagar
  //         </div>
  //       </div>
  //     )}
  //   </div>
  );
};


const facturaPDF = (datosFactura, datosFacturaDetalle, montoPago) => {
  return (
    <Document>
      <Page size="A6" style={styles.page}>
      <View style={styles.section}>
  <Text style={styles.title}>Empresa....</Text>
  <Text style={styles.title2}>Factura Nº:{datosFacturaDetalle.ID_FACTURA}</Text>
  {/* <View style={styles.row}>
    <View style={styles.column}>
      <Text style={styles.label}>fecha:01/01/2023</Text>
    </View>
    <View style={styles.column}>
      <Text style={styles.label}>vendedor:Juan Perez</Text>
    </View>
  </View> */}
  <Text style={styles.total}>Direcion:</Text>
  <Text style={styles.total}>Usuario:{datosFacturaDetalle.ID_USUARIO}</Text>
  <Text style={styles.total}>Fecha:{datosFacturaDetalle.FECHA_HORA}</Text>
</View>
        <View style={styles.section}>
          {/* <Text style={styles.heading}>Detalle de compra</Text> */}
          <View style={styles.row} >
              <Text>CANT. </Text>
              <Text>Items</Text>
              <Text>Precio</Text>
            </View>
          {datosFactura.map((objetoDtll, index) => (
            <View style={styles.rowItens} key={index}>
              <Text>{objetoDtll.CANTIDAD.toFixed(0)} </Text>
              <Text>{objetoDtll.NOMBRE_PRODUCTO}</Text>
              <Text>S/.{(objetoDtll.PRECIO_UNITARIO).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text style={styles.total}>Total:</Text>
            <Text style={styles.total}>S/.{datosFacturaDetalle.TOTAL}</Text>
          </View>
        </View>
        <View style={styles.piePagina}>
        <View style={styles.section}>
        <View style={styles.rowItensePagina}>

        <Text style={styles.total}>Pago:S/.{datosFacturaDetalle.MONTO_PAGADO}</Text>
        <Text style={styles.total}>Vuelto: S/.{datosFacturaDetalle.VUELTO ? datosFacturaDetalle.VUELTO.toFixed(0) : ''}</Text>
        </View>

          <Text style={styles.heading}>Forma de pago</Text>
          <Text>Efectivo</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Gracias por su compra!</Text>
        </View>
        </View>
      </Page>
    </Document>
  );
};


export default Facturacion;

  // const crearPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Detalle de la Orden", 10, 10);
  //   let y = 20;
  //   DetalleOrd.forEach(objetoDtll => {
  //     doc.text(`- ${objetoDtll.NOMBRE_PRODUCTO} x ${objetoDtll.CANTIDAD}: $${parseFloat(objetoDtll.TOTAL).toFixed(2)}`, 10, y);
  //     y += 10;
  //   });
  //   doc.text(`Total: $${parseFloat(sumatotal).toFixed(2)}`, 10, y+10);
  //   doc.save("detalle_orden.pdf");
  // }
  // const generarPDF = () => {
  //   // Crea un nuevo documento PDF
  //   const doc = new jsPDF();

  //   // Agrega el encabezado del documento
  //   doc.text('Detalle del pedido', 10, 10);

  //   // Agrega los datos de DetalleOrd al documento
  //   let posY = 20;
  //   DetalleOrd.forEach((objetoDtll) => {
  //     doc.text(`${objetoDtll.NOMBRE_PRODUCTO} - ${objetoDtll.CANTIDAD} x ${parseFloat(objetoDtll.PRECIO).toFixed(2)} = ${parseFloat(objetoDtll.TOTAL).toFixed(2)}`, 10, posY);
  //     posY += 10;
  //   });

  //   // Agrega el total del pedido al documento
  //   doc.text(`Total: ${parseFloat(sumatotal).toFixed(2)}`, 10, posY);

  //   // Guarda el PDF
  //   doc.save('detalle_pedido.pdf');
  // };

    // const facturaPDF = (detalle, sumatotal) => {
    //   return (
    //     <Document>
    //       <Page size="A4" style={styles.page}>
    //         <View style={styles.header}>
    //           <View>
    //             {/* <Image style={styles.logo} src="/ruta/para/logo.png" /> */}
    //             <Text style={styles.title}>Factura #</Text>
    //           </View>
    //           <View>
    //             <Text>Fecha: </Text>
    //             <Text>Cliente: </Text>
    //           </View>
    //         </View>
    //         <View style={styles.section}>
    //           <Text style={styles.subtitle}>Detalle de la factura:</Text>
    //           {detalle.map((objetoDtll, index) => (
    //             <View key={index}>
    //               <Text style={styles.text}>{objetoDtll.NOMBRE_PRODUCTO}</Text>
    //               <Text style={styles.text}>
    //                 {objetoDtll.CANTIDAD} x ${objetoDtll.PRECIO_UNITARIO} = ${objetoDtll.TOTAL}
    //               </Text>
    //             </View>
    //           ))}
    //           <Text style={styles.total}>Total: ${sumatotal.toFixed(2)}</Text>
    //         </View>
    //       </Page>
    //     </Document>
    //   );
    // };