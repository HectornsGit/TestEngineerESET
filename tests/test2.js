const {
  screen,
  centerOf,
  imageResource,
  straightTo,
  keyboard,
  Key,
} = require("@nut-tree/nut-js");

const { mouse, right, down, Button } = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");

const alreadyTested = [...process.argv].includes("f".toLocaleLowerCase())
  ? false
  : true;

screen.config.confidence = 0.98;
screen.config.resourceDirectory = "./images";
screen.config.autoHighlight = "on";

//---------------------------------------------------------------------------------------------
// Test 2. Set Logs Age limit to 1.
// This test only works if the last input clicked is not the logs age limit selector.
//---------------------------------------------------------------------------------------------
const testAgeLimitOne = async (alreadyTested = true) => {
  try {
    const logsAgeLimitSelector = screen.find(
      imageResource("./logs_age_limit_selector.png")
    );

    if (logsAgeLimitSelector) {
      // 1. changes "logs Age limit" value to 1.
      await mouse.move(straightTo(centerOf(logsAgeLimitSelector)));
      await mouse.click(Button.LEFT);
      await keyboard.type(Key.Num1);

      const collectButton = screen.find(imageResource("./collect_button.png"));
      if (collectButton) {
        // 2. clicks collect button.
        await mouse.move(straightTo(centerOf(collectButton)));
        await mouse.click(Button.LEFT);

        // Changes template matcher precision to find the next windows.
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

        // 3. clicks success window.
        if (successWindow) {
          await mouse.move(straightTo(centerOf(successWindow)));
          await mouse.move(right(80));
          await mouse.move(down(50));
          await mouse.click(Button.LEFT);
        }
      }
    }
  } catch (error) {
    console.error("Could not find element required.");
  }
};

testAgeLimitOne(alreadyTested);
