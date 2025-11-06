import { LitElement, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { ContextProvider } from "@lit/context";

import { PersonResolveTask, PersonSuggestTask, type PersonInfo } from "@equinor/fusion-wc-person";

import { pickerContext } from "./controllers/context";
import SelectedController from "./controllers/SelectedController";
import ResolvedController from "./controllers/ResolvedController";
import { PeopleProps } from "./types";
import { NavigateController } from "./components/picker/NavigateController";
import { ClickOutsideController } from "./controllers/ClickOutsideController";

/**
 * Base element class for all public people components.
 * All public people components that share the same PeopleProps and controller logic should extend this class.
 */
export abstract class PeopleBaseElement extends LitElement implements PeopleProps {
  tasks: {
    resolve: PersonResolveTask;
    suggest?: PersonSuggestTask;
  } = {
      resolve: new PersonResolveTask(this),
    };

  controllers: {
    selected: SelectedController;
    resolved: ResolvedController;
    navigate?: NavigateController;
    clickOutside?: ClickOutsideController;
  } = {
      selected: new SelectedController(this),
      resolved: new ResolvedController(this),
    };

  protected _provider = new ContextProvider(this, {
    context: pickerContext,
  });

  /**
   * The value of the element
   * A comma seperated string of Azure IDs of the people selected
   */
  @property({ type: String, reflect: true })
  value: string = '';

  /**
   * Whether the element should allow multiple selections.
   * Default is true.
   */
  @property()
  multiple: boolean = true;

  /**
   * The PersonInfo objects to display as selected people.
   * Should be a JSON string of PersonInfo objects.
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? JSON.parse(value) : []
  })
  people: PersonInfo[] = [];

  /**
   * The Azure IDs of the people to resolve and add to selected people.
   * Should be a comma seperated string of Azure IDs.
   * @ps The ids will be resolved on mount only.
   */
  @property({
    type: Array,
    converter: (value: string | null) => {
      if (!value) {
        return [];
      }
      return value.split(',').map(id => id.trim());
    }
  })
  resolveIds: string[] = [];


  @state()
  initalresolved: boolean = false;

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is jobTitle
   */
  @property({ type: String })
  subtitle: keyof PersonInfo = 'jobTitle';

  /**
   * The property from PersonInfo to display as secondary subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  secondarySubtitle: keyof PersonInfo = 'department';

  /**
   * The errors to display in the component
   * Should be an array of strings.
   */
  @state()
  errors: string[] = [];

  updated(changes: PropertyValues) {
    // when updating the people property, set the selected people to the new people
    if (changes.has('people')) {
      this.controllers.selected.setSelectedPeople(this.people);
    }

    // update provider context
    this._provider.setValue({
      subtitle: this.subtitle,
      secondarySubtitle: this.secondarySubtitle,
      selected: this.controllers.selected,
    });
  }
}

export default PeopleBaseElement;
