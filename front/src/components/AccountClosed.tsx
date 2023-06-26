import { FunctionComponent, useCallback, useState } from 'react';
import SubmitButton from './SubmitButton';
import MyAccount from './MyAccount';
import { useNavigate } from 'react-router-dom';

interface AccountClosedProps {
    name: string;
}

const AccountClosed: FunctionComponent<AccountClosedProps> = ({ name }) => {
  const [showEditComponent, setShowEditComponent] = useState(false);

  const handleEditContainerClick = () => {
    setShowEditComponent(true);
  };

  const options = [
    { value: 'option1', label: 'View cameras' },
    { value: 'option2', label: 'Disable all cameras' },
    { value: 'option3', label: 'Option 3' }
  ]

  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleDropdownChange = (selectedValues: string[]) => {
    setSelectedValues(selectedValues)
  }

  const navigate = useNavigate()

  const onSaveContainerClick = useCallback(() => {
    navigate('/adminpanel')
  }, [navigate])

  const onDeleteContainerClick = useCallback(() => {
    navigate('/adminpanel')
  }, [navigate])

  

  if (showEditComponent) {
    return (
        <MyAccount
        name={name}
        options={options}
        selectedValues={selectedValues}
        handleDropdownChange={handleDropdownChange}
        onDeleteContainerClick={onDeleteContainerClick}
        onSaveContainerClick={onSaveContainerClick}
      />
    );
  }

  return (
    <div className="account-closed">
      <div className="xavier-thellier">{name}</div>
      <SubmitButton onClick={handleEditContainerClick} text="Edit" />
    </div>
  );
};

export default AccountClosed;
