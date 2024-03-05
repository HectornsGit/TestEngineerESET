const {
  screen,
  centerOf,
  imageResource,
  straightTo,
} = require("@nut-tree/nut-js");

const { mouse, right, down, Button } = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");

const alreadyTested = [...process.argv].includes("f".toLocaleLowerCase())
  ? false
  : true;

screen.config.confidence = 0.98;
screen.config.resourceDirectory = "../images";
screen.config.autoHighlight = "on";

//---------------------------------------------------------------------------------------------
// Test 1. Default settings test.
// This test only works if there's no file named "ELC_logs.zip" in the default output directory.
//---------------------------------------------------------------------------------------------
const testEverythingDefault = async (alreadyTested = true) => {
  try {
    const collectButton = screen.find(imageResource("./collect_button.png"));
    if (collectButton) {
      //1. clicks collect button.
      await mouse.move(straightTo(centerOf(collectButton)));
      await mouse.click(Button.LEFT);

      //Changes template matcher precision to find the success window.
      screen.config.confidence = 0.997;

      // If there's already a log in the default directory this will overwrite it.
      if (alreadyTested) {
        const alreadyExistWindow = await screen.waitFor(
          imageResource("./already_exists_window.png")
        );
        if (alreadyExistWindow) {
          await mouse.move(straightTo(centerOf(alreadyExistWindow)));
          await mouse.move(down(50));
          await mouse.click(Button.LEFT);
        }
      }
      const successWindow = await screen.waitFor(
        imageResource("./success_message_window.png"),
        600000
      );

      //2. clicks success window.
      if (successWindow) {
        await mouse.move(straightTo(centerOf(successWindow)));
        await mouse.move(right(80));
        await mouse.move(down(50));
        await mouse.click(Button.LEFT);
      }
    }
  } catch (error) {
    console.error("Could not find element required.");
  }
};
testEverythingDefault(alreadyTested);
