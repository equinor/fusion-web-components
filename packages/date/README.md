<!--prettier-ignore-start-->
## `fusion-wc-date` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-date.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-date)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-date)

## Installation
```sh
npm install @equinor/fusion-wc-date
```

## DateTime `<fwc-datetime>`
### Example Usage

#### Date
```ts
return (
  <fwc-datetime format={DateTimeFormat.date} date='2021-08-09T11:12:49Z'/>
);
```

#### Date & Time
```ts
return (
  <fwc-datetime format={DateTimeFormat.datetime} date='2021-08-09T11:12:49Z'/>
);
```

#### Time
```ts
return (
  <fwc-datetime format={DateTimeFormat.time} date='2021-08-09T11:12:49Z'/>
);
```

#### Custom
```ts
return (
  <fwc-datetime format='yyyy.MM.dd' date='2021-08-09T11:12:49Z'/>
);
```

#### Alternative format type
The `format` variable can also be given as a value instead of a typed enum
```ts
return (
  <fwc-datetime format='datetime' date='2021-08-09T11:12:49Z'/>
);
```

### Properties/Attributes

Name                    | Type                        | Default          | Description
---------------------   | --------------              | -----------      | -----------------
`date`                  | `string`                    | `current date`   | The date to format in ISO format. See ['ISO_8601'](https://en.wikipedia.org/wiki/ISO_8601).
`format`                | `DateTimeFormat* or string` | `datetime`       | Predefined or custom format to use. Based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
`locale`                | `Locale`                    | `enGB`           | Used to override the locale for which the date format calculation is based. See date-fns [`Locale`](https://date-fns.org/v2.23.0/docs/Locale).

\*  `DateTimeFormat` is exported by `fwc-date`.
```ts
enum DateTimeFormat {
  date = 'dd.MM.yyyy',
  time = 'HH:mm',
  datetime = 'HH:mm dd.MM.yyyy',
  time_with_seconds = 'HH:mm:ss',
  datetime_with_seconds = 'HH:mm:ss dd.MM.yyyy',
}
```

## Range `<fwc-daterange>`
### Example Usage

#### Relative
```ts
return (
  <fwc-daterange variant='relative' date='2021-08-09T09:12:49Z' baseDate='2021-08-09T11:12:49Z' />
);
```

#### Distance
```ts
return (
  <fwc-daterange variant='distance' date='2021-08-09T09:12:49Z' baseDate='2021-08-09T11:12:49Z' />
);
```

#### Date & Time (From - To)
```ts
return (
  <fwc-daterange
    variant="datetime"
    format={DateTimeFormat.datetime}
    date="2021-08-09T09:12:49Z"
    baseDate="2021-08-09T11:12:49Z"
  />
);
```

#### Date & Time with custom separator
```ts
return (
  <fwc-daterange
    variant="datetime"
    format={DateTimeFormat.datetime}
    date="2021-08-09T09:12:49Z"
    baseDate="2021-08-09T11:12:49Z"
  >
  <span slot="separator">to</span>
  </fwc-daterange>
);
```

### Slots
| Name          | Default                 | Description
| ------------  | ----------------------  | -----------
| `separator`   | `<span>-</span>`        | Separator element to render between `from` and `to` dates for variant `datetime`.

### Properties/Attributes

Name                    | Type                         | Default        | Description
---------------------   | --------------               | -----------    | -----------------
`from`                  | `string`                     | `current date` | The date to format in ISO format. See ['ISO_8601'](https://en.wikipedia.org/wiki/ISO_8601).
`to`                    | `string`                     | `current date` | The date to compare with in ISO format. See ['ISO_8601'](https://en.wikipedia.org/wiki/ISO_8601).
`variant`               | `DateRangeVariant*`          | `datetime`     | Templated variant to use as basis for format calculation, defaults to `datetime` (`HH:mm dd.MM.yyyy` - `HH:mm dd.MM.yyyy`).
`format`                | `DateTimeFormat** or string` | `undefined`    | Predefined or custom format to use. Based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
`locale`                | `Locale`                     | `enGB`         | Used to override the locale for which the date format calculation is based. See date-fns [`Locale`](https://date-fns.org/v2.23.0/docs/Locale).
`seconds`               | `boolean`                    | `false`        | Set `true` to include seconds in the `distance` variant.
`weekstart`             | `WeekDay***`                 | `1`            | The index of the first day of the week (`0 = Sunday`).
`suffix`                | `boolean`                    | `false`        | Include a suffix to indicate if the `date` is before or after the `baseDate`. Only applies to variant `distance`.
`capitalize`            | `boolean`                    | `false`        | Set `true` to capitalize the first character in the formatted text. Applies to `distance` and `relative` variants.

\*  `DateRangeVariant` is exported by `fwc-date`.
```ts
type DateRangeVariant = 'relative' | 'distance' | 'datetime';
```

\*\*  `DateTimeFormat` is exported by `fwc-date`.
```ts
enum DateTimeFormat {
  date = 'dd.MM.yyyy',
  time = 'HH:mm',
  datetime = 'HH:mm dd.MM.yyyy',
  time_with_seconds = 'HH:mm:ss',
  datetime_with_seconds = 'HH:mm:ss dd.MM.yyyy',
}
```

\*\*\*  `WeekDay` is exported by `fwc-date`.
```ts
type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;
```
<!--prettier-ignore-end-->
