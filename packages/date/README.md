<!--prettier-ignore-start-->
## `fusion-wc-date` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-date.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-date)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-date)

### Installation
```sh
npm install @equinor/fusion-wc-date
```

## Example Usage

```ts
const date = new Date(2021, 8, 1, 12, 0);
const baseDate = new Date();
return <fwc-date variant='distance' date={date} baseDate={baseDate}/>
```

### Properties/Attributes

Name                    | Type             | Default      | Description
---------------------   | --------------   | -----------  | -----------------
`date`                  | `Date`           | `new Date()` | The date to format.
`baseDate`              | `Date`           | `new Date()` | The date to compare with for variants `distance` and `relative`.
`variant`               | `DateVariant*`   | `datetime`   | Templated variant to use as basis for format calculation, defaults to `datetime` (`HH:mm dd.MM.yyyy`).
`format`                | `string`         | ''           | Custom format to use instead of templated variants. Overrides `variant` property to `custom` if assigned. Based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
`locale`                | `Locale`         | `enGB`       | Used to override the locale for which the date format calculation is based. See date-fns [`Locale`](https://date-fns.org/v2.23.0/docs/Locale).
`capitalizeFirstLetter` | `boolean`        | `false`      | Set to `true` to capitalize the first letter in the formatted string.
`includeSeconds`        | `boolean`        | `false`      | Set to `true` to include seconds in the date format. Applies to variants `datetime`, `time` and `distance`.
`weekStartsOn`          | `WeekDay**`      | `1`          | The index of the first day of the week (`0 = Sunday`).
`addSuffix`             | `boolean`        | `false`      | Include a suffix to indicate if the `date` is before or after the `baseDate`. Only applies to variant `distance`.

\*  `DateVariant` is exported by `fwc-date`.
```ts
type DateVariant = 'date' | 'time' | 'datetime' | 'relative' | 'distance' | 'custom';
```

\*\*  `WeekDay` is exported by `fwc-date`.
```ts
type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;
```
<!--prettier-ignore-end-->
