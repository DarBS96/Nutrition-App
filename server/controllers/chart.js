const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const width = 1000; // define width and height of canvas
const height = 1000;
const chartCallback = (ChartJS) => {
  console.log("chart built");
};
const canvasRenderService = new ChartJSNodeCanvas({
  width,
  height,
  chartCallback,
});

const createImage = async () => {
  const configuration = {
    type: "doughnut", // for line chart
    data: {
      labels: ["calories", "proteins", "sugars"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
        },
      ],
    },
  };

  const dataUrl = await canvasRenderService.renderToDataURL(configuration); // converts chart to image
  console.log(dataUrl);
  return dataUrl;
};

//  <div class="chartContainer container mt-4">
//             <% if (img) { %>
//                 <img style="width: 600px; height: 600px" class="d-block m-auto" src="<%= img  %>" alt="" />
//                 <% } %>
//         </div>

module.exports = { createImage };
