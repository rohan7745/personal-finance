import React from 'react'
import './Modal.css'
import { Modal,Form,Button,Input,DatePicker,Select } from 'antd'
const AddExpense = ({isexpensemodal,handleExpenseModalClose,onFinish}) => {
  const [form] = Form.useForm();

  return (
    <Modal style={{fontWeight:600}} title="Add Expense" visible={isexpensemodal} onCancel={handleExpenseModalClose} footer={null} >
      <Form form={form} layout="vertical" onFinish={(values)=>{onFinish(values,"expense");form.resetFields();}}>
        <Form.Item style={{fontWeight:600}} label="Name" name="name" rules={[{required:true,message: "Please input the name of the transaction!"},]} >
          <Input type="text" className='custom-input1'/>
        </Form.Item>
        <Form.Item style={{fontWeight:600}} label="Amount" name='amount' rules={[{required:true,message:"Please input the expense amount!"},]} >
        <Input type="number" className='custom-input1'/>
        </Form.Item>
        <Form.Item style={{fontWeight:600}} label='Date' name='date' rules={[{required:true,message:'Please select the expense date!'},]}>
        <DatePicker format="YYYY-MM-DD" className='custom-input1'/>
        </Form.Item>
        <Form.Item style={{fontWeight:600}} label="Tag" name="tag" rules={[{message:"please select a tag!"}]}>
          <Select className='select-input-2'>
          <Select.Option value="Lauch">Launch</Select.Option>
            <Select.Option value="Dinner">Dinner</Select.Option>
            <Select.Option value="Party">Party</Select.Option>
            <Select.Option value="Travel">Travel</Select.Option>
            <Select.Option value="Shopping">Shopping</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Expense</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddExpense