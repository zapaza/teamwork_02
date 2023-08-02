import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { ButtonsProps } from '../../ui/button/button'
import Modal, { ModalProps } from '../modal'
import { updateProfileSchema } from '../../../core/validator'
import Form from '../../ui/form/form'
import { updateProfile } from '../../../store/auth/auth-slice'
import { UpdateProfileReq } from '../../../core/api/api-profile'
import getProfileFieldsProps from '../../../utils/get-profile-fields-props'

const submitButton: ButtonsProps[] = [
  {
    name: 'update',
    children: 'Update',
  },
]

type UpdateProfileModalProps = Omit<ModalProps, 'children'>

function UpdateProfileModal(props: UpdateProfileModalProps) {
  const dispatch: AppDispatch = useDispatch()
  const profileData = useSelector((state: RootState) => state.auth)
  const inputs = getProfileFieldsProps(profileData)

  const onSubmit = async (data: unknown) => {
    props.toggle()
    dispatch(updateProfile(data as UpdateProfileReq)).unwrap()
  }

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <Form
        name={'updateProfile'}
        title={'Update profile'}
        inputs={inputs}
        validationSchema={updateProfileSchema}
        buttons={submitButton}
        callback={onSubmit}
        type="json"
      />
    </Modal>
  )
}

export default UpdateProfileModal
