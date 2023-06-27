import { FunctionComponent } from 'react';
import AdminFormContainer from './AdminFormContainer';
import MultiSelectDropdown from './MultiSelectDropdown';
import DeleteButton from './DeleteButton';
import SubmitButton from './SubmitButton';

interface MyAccountProps {
  name: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  handleDropdownChange: (selectedValues: string[]) => void;
  onDeleteContainerClick: () => void;
  onSaveContainerClick: () => void;
}

const MyAccount: FunctionComponent<MyAccountProps> = ({
  name,
  options,
  selectedValues,
  handleDropdownChange,
  onDeleteContainerClick,
  onSaveContainerClick,
}) => {
  return (
    <div className="my-account">
      <div className="charles-perrard">{name}</div>
      <div className="fields">
        <div className="select">
          <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon="/pen2.svg" />
        </div>
        <div className="select">
          <div className="login6">Permissions</div>
          <div className="permissions-allow-you">
            Permissions allow you to configure what action a user is able to accomplish.
          </div>
          <div className="">
            <MultiSelectDropdown
              options={options}
              selectedValues={selectedValues}
              onChange={handleDropdownChange}
              closedLabel="Click here to select permissions"
            />
          </div>
          <div className="permissions-allow-you2">
            Permissions allow you to configure what action a user is able to accomplish.
          </div>
        </div>
      </div>
      <div className="buttonblock">
        <DeleteButton onClick={onDeleteContainerClick} text="Delete" />
        <SubmitButton onClick={onSaveContainerClick} text="Save" />
      </div>
    </div>
  );
};

export default MyAccount;
