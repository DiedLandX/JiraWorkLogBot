import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ComponentType,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { getCurrentIssues } from "../jiraService";
import { Issue } from "../utils/types";

const createOption = ({
  fields,
  key,
}: Issue): StringSelectMenuOptionBuilder => {
  return new StringSelectMenuOptionBuilder()
    .setLabel(key)
    .setDescription(fields.description)
    .setValue(key);
};

const createDropDownOptions = (): StringSelectMenuOptionBuilder[] =>
  getCurrentIssues().map((issue) => createOption(issue));

export const worklogInteraction = async (
  interaction: ChatInputCommandInteraction
) => {
  const issueSelectDropdown = new StringSelectMenuBuilder()
    .setCustomId("issueSelect")
    .setPlaceholder("Select an issue!")
    .addOptions(createDropDownOptions());

  const issueSelectRow =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      issueSelectDropdown
    );

  const response = await interaction.reply({
    content: "Jira Work Log ",
    components: [issueSelectRow],
  });

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    time: 3_600_000,
  });

  const createModal = (selectedIssue: string) => {
    const issueLogDescription = new TextInputBuilder()
      .setCustomId("issueLogDescription")
      // The label is the prompt the user sees for this input
      .setLabel("Describe what have you done today?")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Paragraph);

    const row =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        issueLogDescription
      );

    const modal = new ModalBuilder()
      .setCustomId("myModal")
      .setTitle("Log work for issue: " + selectedIssue)
      .addComponents(row);

    return modal;
  };

  collector.on("collect", async (i) => {
    const selection = i.values[0];

    await i.showModal(createModal(selection));
  });
};
