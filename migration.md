Migrate the Radix wrapper components to Base UI one primitive at a time. `rc-prep` is the up-to-date branch you'll be working off of, in a new worktree in the ~/www.

Requirements:
- Public API for every local component can change. Breaking changes are expected, since Base UI offers different API shape, renamed props, and for some components, a different structure.
- For most simple wrapper components, the expectation is that the implementation stays roughly the same.
- Read the migration guide first: https://shadcnstudio.com/blog/migrate-from-radix-ui-to-base-ui. Ignore shadcn-specific parts.
- Read Radix/Base UI docs as needed while migrating.
- If a component does not have a story, add a story before migrating it so you can compare and verify.
- Use temporary snapshots or browser checks, whichever is more reliable for each component.
- Browser checks should be comparisons between the worktree and `rc-prep` branch, to ensure the end results are exactly the same. It's your call to decide what's the best approach to ensure this: browser comparison, snapshots, or anything else. Assess this thoroughly.
- Keep verification lightweight: prove behavior/API compatibility without adding noisy wrapper tests.
- Do not move to the next primitive until the current one is migrated and verified.
- Current version of the Slider is patched. Remove the patch. Make sure the Base UI version preserves that functionality. The Radix patch’s purpose was to keep the thumb centered on the actual value coordinate instead of clamping/offsetting it inside the track. The Base UI replacement is thumbAlignment="center"
- Use Base UI’s mergeProps instead of the current merge-props package; verify compatibility before replacing it broadly.

End state:
- Radix usage removed from migrated wrappers.
- Existing call sites still typecheck accounting for any minimal API changes that occurred.
- Stories/fixtures exist for migrated components.
- Verification results summarized component by component.


# Appendix: Radix UI vs Base UI differences

Below is a **non-definitive** list of notable differences between the libraries. 

- `asChild` becomes `render`
  Radix uses `asChild` + Slot. Base UI uses `render={<Button />}` or a render function.

- `className` / `style` can be callbacks
  Base UI often allows `className={(state) => ...}` and `style={(state) => ...}`. Wrappers should not narrow these to plain strings.

- `Content` is often split
  Radix often combines popup DOM and positioning in `Content`.
  Base UI usually splits this into:
  `Portal -> Positioner -> Popup`

- Mounting prop names differ
  Radix commonly uses `forceMount`.
  Base UI generally uses `keepMounted` where supported.

- Menu item events differ
  Radix menu items expose `onSelect`.
  Base UI menu items use click-style handlers and `event.preventBaseUIHandler()`.

- State data attributes differ
  Radix often uses `data-state="open|closed|checked|unchecked|active|inactive"`.
  Base UI often uses boolean attributes like `data-open`, `data-checked`, `data-active`, `data-pressed`.

- Some prop names changed
  Examples:
  `Tooltip.Provider delayDuration` -> `delay`
  `skipDelayDuration` -> `timeout`
  `disableHoverableContent` -> `disableHoverablePopup`
  `Tabs.Root activationMode` -> `Tabs.List activateOnFocus`
  `loop` -> `loopFocus`

- Some value shapes differ
  Radix `ToggleGroup` single mode uses a string value.
  Base UI `ToggleGroup` uses an array value, even with `multiple={false}`.

- Slider value shape differs
  Base UI supports scalar or array values.
  The old wrapper API was array-only.

- Select is more data-aware
  Base Select can take an `items` structure and uses item `label` for display/typeahead.
  Radix usage often relies on child structure like `ItemText`.

- Direction is provider-based
  Base UI often uses `DirectionProvider` around components.
  Radix commonly accepted `dir` directly on roots.

- Base UI has more explicit anatomy
  Prefer exposing Base UI parts directly instead of rebuilding Radix-shaped convenience wrappers unless the API compatibility is intentional.