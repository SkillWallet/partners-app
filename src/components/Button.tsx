import { SxProps, Theme } from '@mui/material';
import { pxToRem } from '@utils/text-size';
import { SwButton } from 'sw-web-shared';
import { SwButtonProps } from 'sw-web-shared/lib/components/SwButton/SwButton';

interface ButtonProps extends SwButtonProps {
  btnStyles?: SxProps<Theme>;
}

const PartnerButton = (
  { btnStyles, ...btnProps }: ButtonProps = {
    btnStyles: {} as SxProps<Theme>,
  }
) => {
  return (
    <SwButton
      sx={{
        fontSize: pxToRem(30),
        width: pxToRem(480),
        height: pxToRem(120),
        padding: `0 ${pxToRem(95)}`,
        '&:hover': {
          '& > .sw-btn-label > .MuiTypography-root': {
            color: btnProps.mode !== 'dark' ? '#fff' : '#000',
          },
        },
        '.sw-btn-label': {
          width: '100%',
          textAlign: 'left',
        },
        ...btnStyles,
      }}
      {...btnProps}
    />
  );
};

export default PartnerButton;
