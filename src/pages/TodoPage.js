import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const TodoPage = ({ setUser }) => {
    const [todoList, setTodoList] = useState([])
    const [todoValue, setTodoValue] = useState('')
    const navigate = useNavigate()
    // 가져오기
    const getTasks = async () => {
        const response = await api.get('/tasks')
        console.log("여기", response.data.data)
        setTodoList(response.data.data)
    }
    // 저장하기 
    const addTask = async () => {
        try {
            const response = await api.post('/tasks', { task: todoValue, isComplete: false });
            if (response.status === 200) {
                console.log('Success')
                setTodoValue(''); // 입력창 초기화
                getTasks() // 추가한 값이 보이게 
            } else {
                throw new Error("Task can not be added")
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    // isComplete 수정
    const toggleComplete = async (id) => {
        try {
            const task = todoList.find((item) => item._id === id);
            const response = await api.put(`/tasks/${id}`, {
                isComplete: !task.isComplete,
            });
            if (response.status === 200) {
                getTasks();
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    // 삭제
    const deleteItem = async (id) => {
        try {
            console.log(id);
            const response = await api.delete(`/tasks/${id}`);
            if (response.status === 200) {
                getTasks();
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const logout = () => {
        sessionStorage.removeItem("token")
        setUser(null)
        navigate('/login')
    }
    // 처음 보였을때 리스트 가져오기 
    useEffect(() => {
        getTasks()
    }, [])
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button className="logout-button" onClick={logout}>
                        로그아웃
                    </Button>
                </Col>
            </Row>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        className="input-box"
                        value={todoValue}
                        onChange={(event) => setTodoValue(event.target.value)}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={addTask}>추가</button>
                </Col>
            </Row>

            <TodoBoard
                todoList={todoList}
                deleteItem={deleteItem}
                toggleComplete={toggleComplete}
            />
        </Container>
    );
}

export default TodoPage
