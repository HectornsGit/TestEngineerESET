const {
  screen,
  centerOf,
  imageResource,
  straightTo,
} = require("@nut-tree/nut-js");

const { mouse, right, down, Button } = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");

screen.config.confidence = 0.98;
screen.config.resourceDirectory = "../images";
screen.config.autoHighlight = "on";

//---------------------------------------------------------------------------------------------
// Test 7. Set collection profile to "None".
// This test only works if Collection profile is set to Default.
//---------------------------------------------------------------------------------------------
const testSetCollectionProfileToNone = async () => {
  try {
    const collectionProfileSelector = screen.find(
      imageResource("./profile_selector.png")
    );

    if (collectionProfileSelector) {
      // 1. changes "collection profile" value to "None".
      await mouse.move(straightTo(centerOf(collectionProfileSelector)));
      await mouse.click(Button.LEFT);
      await mouse.move(down(65));
      await mouse.click(Button.LEFT);

      const collectButton = screen.find(imageResource("./collect_button.png"));
      if (collectButton) {
        // 2. clicks collect button.
        await mouse.move(straightTo(centerOf(collectButton)));
        await mouse.click(Button.LEFT);

        // Changes template matcher precision to find the next windows.
        screen.config.confidence = 0.997;

        const noArtifactsSelectedWindow = await screen.waitFor(
          imageResource("./no_artifacts_selected_window.png")
        );
        if (noArtifactsSelectedWindow) {
          // 3. closes error message window.
          await mouse.move(straightTo(centerOf(noArtifactsSelectedWindow)));
          await mouse.move(right(50));
          await mouse.move(down(50));
          await mouse.click(Button.LEFT);
        }
      }
    }
  } catch (error) {
    console.error("Could not find element required.");
  }
};

testSetCollectionProfileToNone();
