import styles from "../../../assets/index.css";
import { Bot, BotProps } from "@/components/Bot";
import { BubbleParams } from "@/features/bubble/types";
import { createSignal, onCleanup, onMount, Show } from "solid-js";

export type FullProps = BotProps & BubbleParams;

export const Full = (props: FullProps, { element }: { element: HTMLElement }) => {
  const [isBotDisplayed, setIsBotDisplayed] = createSignal(false);

  const launchBot = () => {
    setIsBotDisplayed(true);
  };

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting)) launchBot();
  });

  onMount(() => {
    botLauncherObserver.observe(element);
  });

  onCleanup(() => {
    botLauncherObserver.disconnect();
  });

  return (
    <>
      <style>{styles}</style>
      <Show when={isBotDisplayed()}>
        <div
          style={{
            "background-color": props.theme?.chatWindow?.backgroundColor || "#ffffff",
            height: "300px", // Sesuaikan tinggi chatbox sesuai kebutuhan Anda
            width: "400px", // Sesuaikan lebar chatbox sesuai kebutuhan Anda
            margin: "auto", // Membuat chatbox berada di tengah
            "margin-top": "50px", // Sesuaikan sesuai kebutuhan
          }}
        >
          <Bot
            badgeBackgroundColor={props.theme?.chatWindow?.backgroundColor}
            welcomeMessage={props.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={props.theme?.chatWindow?.poweredByTextColor}
            textInput={props.theme?.chatWindow?.textInput}
            botMessage={props.theme?.chatWindow?.botMessage}
            userMessage={props.theme?.chatWindow?.userMessage}
            fontSize={props.theme?.chatWindow?.fontSize}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
          />
        </div>
      </Show>
    </>
  );
};
