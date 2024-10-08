import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ orderedItems }) => {
  const productDate = new Map();

  orderedItems.forEach((item) => {
    const productName = item.product.name;
    const quantity = item.quantity;

    if (productDate.has(productName)) {
      productDate.set(productName, productDate.get(productName) + quantity);
    } else {
      productDate.set(productName, quantity);
    }
  });
  // const productArray =[...productDate]
  const productArray = Array.from(productDate, ([product, quantity]) => ({
    product: product,
    [product]: quantity
  }));

  console.log(productDate);
  console.log(productArray);

  return (
    <ResponsiveBar
      data={productArray}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              //   stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              //   fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              //   stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              //   fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            // fill: colors.grey[100],
          },
        },
      }}
      keys={productArray.map((item) => String(item.product))}
      indexBy="product"
      
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: 'category10' }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Product", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Quantity", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in product: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
