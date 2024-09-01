import React from 'react'
import { Modal,Form,Button,Select,Input,DatePicker } from 'antd'


const AddIncome = ({isincomemodal,handleIncomeModalClose,onFinish}) => {
  const [form] = Form.useForm();

  return (
    <Modal style={{fontWeight:600}} title="Add Income" visible={isincomemodal} onCancel={handleIncomeModalClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={(values)=>{onFinish(values,"income");form.resetFields()}}>
        <Form.Item style={{fontWeight:600}} label="Name" name="name" rules={[{required:true,message: "Please input the name of the transaction!"},]} >
          <Input type="text" className='custom-input1'/>
        </Form.Item>
        <Form.Item style={{fontWeight:600}} label="Amount" name='amount' rules={[{required:true,message:"Please input the income amount!"},]} >
        <Input type="number" className='custom-input1'/>
        </Form.Item>
        <Form.Item style={{fontWeight:600}} label='Date' name='date' rules={[{required:true,message:'Please select the income date!'},]}>
        <DatePicker format="YYYY-MM-DD" className='custom-input1'/>
        </Form.Item>
        <Form.Item style={{fontWeight:600}} label="Tag" name="tag" rules={[{required:true,message:"please select a tag!"}]}>
          <Select className='select-input-2'>
            <Select.Option value="Freelance">Freelance</Select.Option>
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Interst">Interst</Select.Option>
            <Select.Option value="Selling">Selling</Select.Option>
            <Select.Option value="Dividend">Dividend</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Income</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddIncome