import { GridToolbarContainer } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { SwButton } from "sw-web-shared";

// @TODO: Move to sw-web-shared

const SwEditToolbar = (props) => {
  const { apiRef, maxSize, title, focusOn } = props;

  const handleClick = () => {
    const ids = apiRef?.current?.getAllRowIds && apiRef?.current?.getAllRowIds();
    const id = ids?.length !== undefined ? ids?.length : 0;
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, "edit");
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });
      apiRef.current.setCellFocus(id, focusOn);
    });
  };

  return (
    <GridToolbarContainer>
      <SwButton
        sx={{
          borderColor: "primary.main",
          width: "230px",
          height: "45px",
        }}
        disabled={maxSize && apiRef?.current?.getAllRowIds()?.length >= maxSize }
        startIcon={<AddIcon className="sw-btn-icon" />}
        onClick={handleClick}
      >
        {title}
      </SwButton>
    </GridToolbarContainer>
  );
};

export default SwEditToolbar;
