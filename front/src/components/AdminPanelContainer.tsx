import { FunctionComponent, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/compo/AdminPanelContainer.css';
import AdminFormContainer from './AdminFormContainer';
import MultiSelectDropdown from './MultiSelectDropdown';
import SubmitButton from './SubmitButton';
import AccountClosed from './AccountClosed';

interface AdminPanelContainerProps {
  accounts: { name: string }[];
}

const AdminPanelContainer: FunctionComponent<AdminPanelContainerProps> = memo(({ accounts }) => {
  const options = [
    { value: 'option1', label: 'View cameras' },
    { value: 'option2', label: 'Disable all cameras' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleDropdownChange = (selectedValues: string[]) => {
    setSelectedValues(selectedValues);
  };

  const navigate = useNavigate();

  const onEditContainerClick = () => {
    navigate('/adminpanel');
  };

  return (
    <div className="users">
      <div className="users1">Users</div>
      <div className="accounts">
        <div className="my-account">
          <div className="charles-perrard">Me</div>
          <div className="fields">
            <div className="select">
              <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon="/vector2.svg" />
            </div>
            <div className="select">
              <AdminFormContainer title="Email" type="email" placeholder="rene.dupuis@gmail.com" icon="/pen2.svg" />
            </div>
            <div className="select">
              <AdminFormContainer
                title="Password"
                type="password"
                placeholder="*****************"
                icon="/password.svg"
              />
            </div>
            <div className="select">
              <div className="login6">Permissions</div>
              <div className="permissions-allow-you">
                Permissions allow you to configure what action a user is able to accomplish.
              </div>
              <MultiSelectDropdown
                options={options}
                selectedValues={selectedValues}
                onChange={handleDropdownChange}
                closedLabel="Click here to select permissions"
              />
            </div>
          </div>
          <div className="buttonblock">
            <SubmitButton onClick={onEditContainerClick} text="Save" />
          </div>
        </div>
        {accounts.map((a, index) => (
          <AccountClosed key={index} name={a.name} />
        ))}
      </div>
    </div>
  );
});

export default AdminPanelContainer;
