import MuiTypography from '.';
import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../theme';
import { ThemeProvider } from '@mui/material';
const meta = {
    title: 'Atoms/Typography',
    component: MuiTypography
} satisfies Meta<typeof MuiTypography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'h2',
        color: 'primary',
        children: 'Contique',
    },
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <Story />
            </ThemeProvider>
        ),
    ],
};
