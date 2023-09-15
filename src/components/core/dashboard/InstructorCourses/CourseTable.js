import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Thead,Th,Tr,Td } from "react-super-responsive-table";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import {setCourse} from "../../../../slices/courseSlice"
import { deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import {COURSE_STATUS} from "../../../../utils/constants"

const CourseTable = ({ courses, setCourses }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token)
    if(result){
      setCourse(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  };
  const dispatch = useDispatch();
  return (
    <div className="text-white">
      <Table>
        <Thead>
          <Tr>
            <Th>Courses</Th>
            <Th>Duration</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td>No Courses Found</Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr key={courses._id}>
                <Td>
                  <div>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                    <p>Created :</p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="text-pink-50">DRAFTED</p>
                    ) : (
                      <p className="text-yellow-50">PUBLISHED</p>
                    )}
                  </div>
                </Td>
                <Td>2h30min</Td>
                <Td>{course.price}</Td>
                <button>Edit</button>
                <button
                  disabled={loading}
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Are You Sure To Delete This Course",
                      text2: "All The Related Data Will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: !loading
                        ? () => handleCourseDelete(course._id)
                        : () => {},
                      btn2Handler: !loading
                        ? () => setConfirmationModal(null)
                        : () => {},
                    });
                  }}
                >
                  Delete
                </button>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
