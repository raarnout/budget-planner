<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AI Agent Guide: Next.js, Prisma, CSS Modules, Atomic Design, Storybook & High-Quality Coverage

You are an expert AI software engineer. Follow these rules, architecture patterns, and conventions strictly for all code modifications.

---

# 1. Project Context

- **Framework**: Next.js (App Router with local documentation reference)
- **Language**: TypeScript (Strict mode)
- **Database ORM**: Prisma ORM
- **Database**: PostgreSQL
- **Styling**: CSS Modules (Native Next.js styling)
- **Architecture**: Atomic Design Pattern
- **Component Documentation**: Storybook
- **Testing**: Vitest or Jest with React Testing Library
- **Goal**: Maintain high-quality, fully tested, production-ready code with meaningful coverage.

---

# 2. Directory Structure (Atomic Design, Storybook & Tests)

All UI components must be structured inside the `/components` directory.

Each component must colocate its implementation, styles, stories, and tests in the same directory.

Example:

- `components/atoms/Button/`
  - `Button.tsx`
  - `Button.module.css`
  - `Button.stories.tsx`
  - `Button.test.tsx`
  - `index.ts`

Example `index.ts`:

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

Do not import internal files directly from outside the component folder. Always import through the public API.

---

# 3. Layout & Encapsulation Rules

## External Layout Ownership

Components (Atoms, Molecules, Organisms) must not define external layout spacing such as `margin`.

Spacing between sibling components must always be controlled by the parent component using:

- Flexbox `gap`
- CSS Grid spacing
- Dedicated layout wrappers

## Internal Visual Styling

Root-level padding is allowed only when intrinsic to the component’s visual appearance.

Examples:

- Button text padding → allowed
- Card internal padding → allowed
- Margin between sibling components → forbidden

## Predictable Layout Behavior

Components must avoid introducing unexpected external spacing or unintended layout side effects.

However, components may intentionally:

- expand or collapse
- animate height or width
- overflow visually
- render overlays or layered content
- reposition internal content dynamically

when required by the UI pattern.

Examples:

- accordions
- dropdowns
- popovers
- modals
- tooltips
- expandable table rows

These behaviors are considered valid component responsibilities.

## Parent Layout Responsibility

Parent components remain responsible for:

- sibling spacing
- alignment
- page flow
- grid placement
- responsive layout behavior

## Molecule Rule

Molecules may arrange internal Atoms using layout styles, but the Molecule itself must not impose unintended external layout spacing.

---

# 4. Testing & Coverage Rules

## Coverage Requirements

All newly created or modified code must include tests.

Aim for:

- 100% meaningful line coverage
- 100% meaningful branch coverage
- 100% meaningful function coverage
- 100% meaningful statement coverage

Do not add brittle or implementation-detail-only tests purely to satisfy coverage metrics.

Prefer:

- Public behavior testing
- Accessibility assertions
- User interaction testing
- Error state testing

## Mandatory Test Cases

Tests must cover:

- Conditional rendering
- Switch cases
- Optional states
- Loading states
- Error states
- Empty states
- Disabled states
- User interactions
- Failure paths
- Accessibility behavior

## Interaction Testing

Use:

```ts
@testing-library/user-event
```

Avoid low-level event dispatching unless absolutely necessary.

## Database Mocking

Never perform real database calls in unit tests.

Mock:

- Prisma calls
- Server actions
- API layers
- External services

## CSS Module Testing

Avoid brittle assertions against generated CSS module class names unless stable mocks are configured.

Prefer testing:

- Rendered behavior
- Accessibility
- Semantic output

---

# 5. Storybook Rules

Every Atom, Molecule, and Organism must include a Storybook story using CSF3 format.

Use:

- `Meta`
- `StoryObj`

Requirements:

- Use realistic mock data
- No Prisma operations
- No real network requests
- No side effects
- Stories must demonstrate major component states

Required states where applicable:

- Default
- Loading
- Empty
- Error
- Disabled
- Interactive

---

# 6. Next.js App Router Rules

## Server Components First

Use Server Components by default.

## Client Component Usage

Use `"use client"` only when required for:

- React state
- Effects
- Browser APIs
- Event handlers
- Refs
- Interactive behavior

Keep Client Components as small as possible.

## Data Fetching

Perform data fetching inside:

- `app/` pages
- layouts
- server components

Prefer:

- `async/await`
- server-side fetching

## Serialization Rules

Do not pass non-serializable values from Server Components to Client Components.

---

# 7. Prisma Rules

## Prisma Client Usage

Always import the shared Prisma instance from:

```ts
@/lib/db
```

Never instantiate:

```ts
new PrismaClient();
```

directly.

## Type Safety

Always use Prisma-generated types when possible.

Example:

```ts
import { User } from '@prisma/client';
```

## Transactions

Use Prisma transactions for multi-step writes that must succeed or fail atomically.

## Authorization

Never trust client-provided user IDs without authorization validation.

## Monetary Values

Never use floating point numbers for financial calculations.

Use:

- integer cents
- Prisma Decimal

instead.

---

# 8. Financial Domain Rules

This application handles financial data and must prioritize correctness.

## Money Handling

Never:

- use floating point math for currency
- store money as JavaScript `number` decimals

Prefer:

- integer cents
- Decimal types

## Transaction Modeling

Always distinguish:

- income
- expense
- transfer
- adjustment

## Recurring Transactions

Recurring transaction logic must:

- be modeled explicitly
- include edge case tests
- correctly handle date rollover cases

## Timezones

Date handling must be timezone-aware where applicable.

## Sensitive Data

Do not log:

- balances
- account numbers
- transaction descriptions
- personal financial metadata

---

# 9. Styling Rules (CSS Modules)

## File Naming

Use:

```text
.module.css
```

for all CSS Modules.

## Naming Convention

Use camelCase class names.

Correct:

```css
.mainContainer
```

Incorrect:

```css
.main-container
```

## Import Pattern

Always import styles as:

```ts
import styles from './Component.module.css';
```

---

# 10. Accessibility Rules

Accessibility is mandatory.

## Semantic HTML

Prefer semantic elements:

- `button`
- `nav`
- `main`
- `table`
- `form`
- `label`

before generic `div` wrappers.

## Keyboard Support

Interactive elements must:

- support keyboard navigation
- expose focus states
- avoid mouse-only interactions

## Labels

All form inputs must have accessible labels.

## Icon Buttons

Icon-only buttons must include:

- `aria-label`

## Color Usage

Do not rely solely on color to communicate meaning.

## Testing Accessibility

Prefer queries such as:

- `getByRole`
- `getByLabelText`
- `getByText`

before using test IDs.

---

# 11. Security & Privacy Rules

## Validation

Validate all inputs server-side.

## Error Handling

Never expose raw database or server errors to users.

## Secrets

Store secrets only in environment variables.

Never hardcode:

- API keys
- credentials
- tokens

## Authorization

Always verify ownership and permissions before:

- reading data
- updating data
- deleting data

## Logging

Do not log sensitive user or financial information.

---

# 12. Definition of Done

Before completing any task, ensure:

- TypeScript passes without errors
- Linting passes
- Tests pass
- Coverage targets are met meaningfully
- Stories are updated if UI changes
- No direct PrismaClient instantiation exists
- No Storybook story performs database or network operations
- Accessibility requirements are satisfied
- Financial calculations avoid floating point arithmetic
- Security and authorization checks are preserved

---

# 13. Agent Workflow

Before editing code:

1. Inspect the existing component, tests, stories, and styles.
2. Read relevant local Next.js docs in:
   - `node_modules/next/dist/docs/`
3. Make the smallest safe change possible.
4. Update tests and stories.
5. Run:
   - typecheck
   - lint
   - tests
   - coverage
6. Verify accessibility.
7. Verify financial calculation safety.
8. Summarize:
   - changed files
   - architectural decisions
   - known limitations

---

# 14. Blueprint Example

## Atom Example: Button

### `components/atoms/Button/Button.tsx`

```tsx
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span data-testid="loading-spinner">Loading...</span>
      ) : (
        children
      )}
    </button>
  );
}
```

### `components/atoms/Button/Button.module.css`

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.primary {
  background-color: #0070f3;
  color: white;
}

.secondary {
  background-color: #eaeaea;
  color: #333;
}
```

### `components/atoms/Button/Button.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button Component', () => {
  it('renders primary variant by default', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', {
      name: /click me/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);

    expect(
      screen.getByRole('button', {
        name: /secondary/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<Button isLoading>Save</Button>);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    expect(screen.queryByText('Save')).not.toBeInTheDocument();

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('supports disabled state', () => {
    render(<Button disabled>Disabled</Button>);

    expect(
      screen.getByRole('button', {
        name: /disabled/i,
      }),
    ).toBeDisabled();
  });

  it('triggers click handler', async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Trigger</Button>);

    await userEvent.click(
      screen.getByRole('button', {
        name: /trigger/i,
      }),
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```
