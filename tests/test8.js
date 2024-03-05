const {
  screen,
  centerOf,
  imageResource,
  straightTo,
  keyboard,
  Key,
} = require("@nut-tree/nut-js");

const { mouse, left, right, down, Button } = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");

screen.config.confidence = 0.98;
screen.config.resourceDirectory = "../images";
screen.config.autoHighlight = "on";

//---------------------------------------------------------------------------------------------
// Test 8. Set output directory to "".
// This test only works if Collection profile is not set to "None".
//---------------------------------------------------------------------------------------------
const testSetOutPutDirectoryToNone = async () => {
  try {
    // Changes template matcher precision to find the next windows.

    const outputDirectoryInput = screen.find(
      imageResource("./output_file_directory_button.png")
    );

    if (outputDirectoryInput) {
      // 1. changes "outputDirectory" value to "".
      await mouse.move(straightTo(centerOf(outputDirectoryInput)));

      await mouse.move(left(200));
      await mouse.drag(left(450));
      await keyboard.type(Key.Delete);

      const collectButton = screen.find(imageResource("./collect_button.png"));
      if (collectButton) {
        // 2. clicks collect button.
        await mouse.move(straightTo(centerOf(collectButton)));
        await mouse.click(Button.LEFT);

        // Changes template matcher precision to find the next windows.
        screen.config.confidence = 0.997;

        const noTargetFileNameWindow = await screen.waitFor(
          imageResource("./target_archive_file_name_empty_window.png")
        );

        if (noTargetFileNameWindow) {
          // 3. closes error message window.
          await mouse.move(straightTo(centerOf(noTargetFileNameWindow)));
          await mouse.move(right(70));
          await mouse.move(down(50));
          await mouse.click(Button.LEFT);
        }
      }
    }
  } catch (error) {
    console.error("Could not find element required.");
  }
};
testSetOutPutDirectoryToNone();
