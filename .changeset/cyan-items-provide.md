---
'@equinor/fusion-wc-person': patch
---

Fixes clearing person when using the `selectedPerson` property

# Summary of Latest Changes in This Branch Compared to Main Branch

## File: `controller.ts`

### Lines: 199-264

### Summary of Changes:

1. **New Methods Added:**
   - **`clearInput()`**: Clears the input fields and resets the host's value and search properties.
   - **`clear()`**: Calls `clearInput()`, clears selected IDs, resets the selected person, and dispatches a custom `PersonSelectEvent`.
   - **`closeClick(e: MouseEvent | KeyboardEvent)`**: Handles the close icon click event, blurs the input and close icon, closes the dropdown if open, and calls an external close handler if defined.

### Detailed Changes:

1. **Method: `clearInput()`**
   - **Purpose:** Clears the input fields and resets the host's value and search properties.
   - **Code:**
     ```typescript
     public clearInput() {
       this.#host.value = '';
       this.#host.search = '';
       this.#host.textInputElement.value = '';
     }
     ```

2. **Method: `clear()`**
   - **Purpose:** Calls `clearInput()`, clears selected IDs, resets the selected person, and dispatches a custom `PersonSelectEvent`.
   - **Code:**
     ```typescript
     public clear() {
       this.clearInput();

       if (this.selectedIds.size) {
         this.selectedIds.clear();
       }

       if (this.#host.selectedPerson) {
         this.#host.selectedPerson = null;
       }

       /* Dispatch custom select event with our details */
       this.#host.dispatchEvent(
         new PersonSelectEvent({
           detail: {
             selected: null,
           },
           bubbles: true,
         }),
       );
     }
     ```

3. **Method: `closeClick(e: MouseEvent | KeyboardEvent)`**
   - **Purpose:** Handles the close icon click event, blurs the input and close icon, closes the dropdown if open, and calls an external close handler if defined.
   - **Code:**
     ```typescript
     public closeClick = (e: MouseEvent | KeyboardEvent): void => {
       if (e.type === 'keydown') {

         /* only close on enter or space not tab */
         const me = e as KeyboardEvent;
         if (me.key !== 'Enter' && me.key !== 'Space') {
           return;
         }

         /* blur closeicon if focused */
         const closeIcon = this.#host.renderRoot.querySelector('.trailing');
         if (closeIcon) {
           (closeIcon as HTMLSpanElement).blur();
         }
       }

       if (this.#host.textInputElement) {
         this.#host.textInputElement.blur();
       }

       /* close dropdown if open */
       if (this.isOpen) {
         this.isOpen = false;
       }

       /* call resolvers handleclick if defined */
       if (this.#externaCloseHandler) {
         this.#externaCloseHandler(e);
       }
     }
     ```