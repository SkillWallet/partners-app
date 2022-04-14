import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { IconButton, InputAdornment, Menu, StandardTextFieldProps, SvgIcon, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { ReactComponent as EmojiIcon } from '@assets/smile-emoji.svg';

const removeEmojisFromText = (text = '') => {
  return text.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
};

interface EmojiPickerProps extends StandardTextFieldProps {
  emojiButtonProps?: {
    disabled?: boolean;
  };
}

const EmojiInputPicker = ({ emojiButtonProps, ...inputProps }: EmojiPickerProps) => {
  const textRef = useRef<any>();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onSelectEmoji = ({ native }) => {
    if (textRef.current) {
      textRef.current.value = `${removeEmojisFromText(textRef.current.value).trim()} ${native}`;
      closeMenu();
    }
  };

  return (
    <>
      <TextField
        {...inputProps}
        inputRef={textRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{
                  position: 'relative',
                  width: '25px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={emojiButtonProps?.disabled}
                onClick={openMenu}
                color="primary"
                component="span"
              >
                <SvgIcon
                  sx={{
                    margin: '0 auto',
                    width: '21px',
                    height: '21px',
                    color: !emojiButtonProps?.disabled ? '#000' : '#777777',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-43%, -43%)',
                  }}
                  component={EmojiIcon}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Menu
        id="long-menu"
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
        PaperProps={{
          style: {
            width: '338px',
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        <Picker onSelect={onSelectEmoji} />
      </Menu>
    </>
  );
};

export default EmojiInputPicker;
