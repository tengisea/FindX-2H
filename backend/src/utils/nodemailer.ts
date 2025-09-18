// import nodemailer from 'nodemailer';
// import { GraphQLError } from 'graphql';
// import { StudentModel, ClassTypeModel, StudentAnswerModel } from '../models';
// import { ClassYear } from '../models/ClassType.model';
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || 'smtp.gmail.com',
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
// const mapClassYearToStudentFormat = (classYear: ClassYear): string => {
//   const mapping: { [key in ClassYear]: string } = {
//     [ClassYear.GRADE_1]: '1р анги',
//     [ClassYear.GRADE_2]: '2р анги',
//     [ClassYear.GRADE_3]: '3р анги',
//     [ClassYear.GRADE_4]: '4р анги',
//     [ClassYear.GRADE_5]: '5р анги',
//     [ClassYear.GRADE_6]: '6р анги',
//     [ClassYear.GRADE_7]: '7р анги',
//     [ClassYear.GRADE_8]: '8р анги',
//     [ClassYear.GRADE_9]: '9р анги',
//     [ClassYear.GRADE_10]: '10р анги',
//     [ClassYear.GRADE_11]: '11р анги',
//     [ClassYear.GRADE_12]: '12р анги',
//   };
//   return mapping[classYear];
// };
// export const sendNewOlympiadNotificationToMatchingStudents = async (
//   olympiadName: string,
//   olympiadDescription: string,
//   classYears: ClassYear[],
//   olympiadDate?: string,
//   location?: string
// ): Promise<{ sentCount: number; totalStudents: number }> => {
//   try {
//     console.log('🎯 Starting new olympiad email notification...');
//     console.log('📚 Target class years:', classYears);

//     const studentClassFormats = classYears.map(mapClassYearToStudentFormat);
//     console.log('🔄 Converted to student formats:', studentClassFormats);

//     const matchingStudents = await StudentModel.find({
//       class: { $in: studentClassFormats }
//     }).select('email name class');

//     console.log(`📧 Found ${matchingStudents.length} matching students`);

//     if (matchingStudents.length === 0) {
//       console.log('ℹ️ No students found matching the target grades');
//       return { sentCount: 0, totalStudents: 0 };
//     }
//     let sentCount = 0;
//     const emailPromises = matchingStudents.map(async (student) => {
//       try {
//         const mailOptions = {
//           from: process.env.SMTP_FROM || 'noreply@olympiad.com',
//           to: student.email,
//           subject: `New Olympiad Available for Your Grade: ${olympiadName}`,
//           html: `
//             <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//               <div style="text-align: center; margin-bottom: 30px;">
//                 <h1 style="color: #1E40AF; margin: 0;">🏆 Olympiad Platform</h1>
//               </div>
              
//               <div style="background-color: #f0f9ff; padding: 30px; border-radius: 10px;">
//                 <h2 style="color: #1E40AF; margin-bottom: 20px; text-align: center;">New Olympiad Alert! 🎯</h2>
//                 <p style="color: #374151; margin-bottom: 20px; line-height: 1.6;">
//                   Hello <strong>${student.name}</strong>,
//                 </p>
//                 <p style="color: #374151; margin-bottom: 30px; line-height: 1.6;">
//                   Exciting news! A new olympiad has been created specifically for your grade level (<strong>${student.class}</strong>). 
//                   This is a perfect opportunity for you to showcase your skills!
//                 </p>
                
//                 <div style="background-color: white; padding: 25px; border-radius: 12px; border-left: 4px solid #1E40AF; margin: 30px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                   <h3 style="color: #1E40AF; margin: 0 0 15px 0; font-size: 24px;">${olympiadName}</h3>
//                   ${olympiadDescription ? `
//                     <p style="color: #4B5563; margin-bottom: 20px; line-height: 1.6;">
//                       ${olympiadDescription}
//                     </p>
//                   ` : ''}
                  
//                   <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin-top: 15px;">
//                     <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">📅 Important Information:</h4>
//                     <p style="color: #1E40AF; margin: 5px 0; font-size: 14px; font-weight: bold;">
//                       <strong>Your Grade:</strong> ${student.class} ✅
//                     </p>
//                     ${olympiadDate ? `
//                       <p style="color: #6B7280; margin: 5px 0; font-size: 14px;">
//                         <strong>Olympiad Date:</strong> ${olympiadDate}
//                       </p>
//                     ` : ''}
//                     ${location ? `
//                       <p style="color: #6B7280; margin: 5px 0; font-size: 14px;">
//                         <strong>Location:</strong> ${location}
//                       </p>
//                     ` : ''}
//                   </div>
//                 </div>
                
//                 <div style="text-align: center; margin: 30px 0;">
//                   <div style="background-color: #1E40AF; color: white; padding: 15px 30px; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
//                     🚀 Register Now - Perfect for Your Grade!
//                   </div>
//                 </div>
                
//                 <div style="background-color: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
//                   <p style="color: #92400E; margin: 0; font-size: 14px; font-weight: 500;">
//                     💡 <strong>Why this is perfect for you:</strong> This olympiad is specifically designed for ${student.class} students like yourself. 
//                     Don't miss this targeted opportunity to compete at your level!
//                   </p>
//                 </div>
                
//                 <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px; text-align: center;">
//                   This olympiad matches your grade level perfectly. Register early to secure your spot!
//                 </p>
//                 <p style="color: #9CA3AF; font-size: 12px; line-height: 1.4; text-align: center;">
//                   You're receiving this because you're in ${student.class} and this olympiad is available for your grade.
//                 </p>
//               </div>
              
//               <div style="text-align: center; margin-top: 30px; color: #9CA3AF; font-size: 12px;">
//                 <p>© 2024 Olympiad Platform. All rights reserved.</p>
//                 <p>Connecting students with grade-appropriate opportunities</p>
//               </div>
//             </div>
//           `,
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`✅ New olympiad email sent to ${student.name} (${student.email}) - Grade: ${student.class}`);
//         sentCount++;
//       } catch (emailError) {
//         console.error(`❌ Failed to send email to ${student.email}:`, emailError);
//       }
//     });

//     await Promise.allSettled(emailPromises);

//     console.log(`📊 New olympiad email summary: ${sentCount}/${matchingStudents.length} emails sent successfully`);

//     return {
//       sentCount,
//       totalStudents: matchingStudents.length
//     };

//   } catch (error) {
//     console.error('Error sending new olympiad notifications to matching students:', error);
    
//     throw new GraphQLError('Failed to send new olympiad notifications', {
//       extensions: {
//         code: 'EMAIL_SERVICE_ERROR',
//       }
//     });
//   }
// };

// export const sendOlympiadFinishedNotification = async (
//   olympiadId: string,
//   olympiadName: string
// ): Promise<{ sentCount: number; totalParticipants: number }> => {
//   try {
//     console.log(`🏁 Olympiad ${olympiadName} has finished! Sending thank you emails...`);

//     const classTypes = await ClassTypeModel.find({ olympiadId }).select('_id participants');
    
//     if (!classTypes || classTypes.length === 0) {
//       console.log('ℹ️ No class types found for this olympiad');
//       return { sentCount: 0, totalParticipants: 0 };
//     }

//     const allParticipantIds = classTypes.flatMap(ct => ct.participants);
//     const uniqueParticipantIds = [...new Set(allParticipantIds.map(id => id.toString()))];

//     console.log(`👥 Found ${uniqueParticipantIds.length} unique participants`);

//     if (uniqueParticipantIds.length === 0) {
//       console.log('ℹ️ No participants found for this olympiad');
//       return { sentCount: 0, totalParticipants: 0 };
//     }

//     const participants = await StudentModel.find({
//       _id: { $in: uniqueParticipantIds }
//     }).select('email name class');

//     let sentCount = 0;
//     const emailPromises = participants.map(async (student) => {
//       try {
//         const classTypeIds = classTypes.map(ct => ct._id);
//         const studentAnswers = await StudentAnswerModel.find({
//           studentId: student._id,
//           classTypeId: { $in: classTypeIds }
//         });

//         const totalScore = studentAnswers.reduce((sum, answer) => 
//           sum + (answer.totalScoreofOlympiad || 0), 0
//         );

//         const mailOptions = {
//           from: process.env.SMTP_FROM || 'noreply@olympiad.com',
//           to: student.email,
//           subject: `Thank You for Participating in ${olympiadName}!`,
//           html: `
//             <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//               <div style="text-align: center; margin-bottom: 30px;">
//                 <h1 style="color: #16A34A; margin: 0;">🏆 Olympiad Platform</h1>
//               </div>
              
//               <div style="background-color: #f0fdf4; padding: 30px; border-radius: 10px;">
//                 <h2 style="color: #16A34A; margin-bottom: 20px; text-align: center;">Thank You for Participating! 🎉</h2>
//                 <p style="color: #374151; margin-bottom: 20px; line-height: 1.6;">
//                   Dear <strong>${student.name}</strong>,
//                 </p>
//                 <p style="color: #374151; margin-bottom: 30px; line-height: 1.6;">
//                   Congratulations on completing the <strong>${olympiadName}</strong>! 
//                   Your participation and dedication are truly commendable.
//                 </p>
                
//                 <div style="background-color: white; padding: 25px; border-radius: 12px; border-left: 4px solid #16A34A; margin: 30px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                   <h3 style="color: #16A34A; margin: 0 0 15px 0; font-size: 24px;">Your Results</h3>
                  
//                   <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin-top: 15px;">
//                     <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">📊 Score Summary:</h4>
//                     <p style="color: #16A34A; margin: 5px 0; font-size: 18px; font-weight: bold;">
//                       <strong>Your Total Score:</strong> ${totalScore} points 🌟
//                     </p>
//                     <p style="color: #6B7280; margin: 5px 0; font-size: 14px;">
//                       <strong>Grade:</strong> ${student.class}
//                     </p>
//                     <p style="color: #6B7280; margin: 5px 0; font-size: 14px;">
//                       <strong>Olympiad:</strong> ${olympiadName}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div style="text-align: center; margin: 30px 0;">
//                   <div style="background-color: #16A34A; color: white; padding: 15px 30px; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
//                     🎯 View Detailed Results
//                   </div>
//                 </div>
                
//                 <div style="background-color: #EFF6FF; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6;">
//                   <p style="color: #1E40AF; margin: 0; font-size: 14px; font-weight: 500;">
//                     🚀 <strong>What's Next:</strong> Check your detailed breakdown, see how you performed on each question, 
//                     and discover areas for improvement in your profile dashboard.
//                   </p>
//                 </div>
                
//                 <div style="background-color: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
//                   <p style="color: #92400E; margin: 0; font-size: 14px;">
//                     🏅 <strong>Keep Learning:</strong> Great job on completing this olympiad! 
//                     Keep practicing and look out for future competitions to continue improving your skills.
//                   </p>
//                 </div>
                
//                 <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px; text-align: center;">
//                   Thank you for being part of our olympiad community. Your dedication to learning is inspiring!
//                 </p>
//                 <p style="color: #9CA3AF; font-size: 12px; line-height: 1.4; text-align: center;">
//                   You can view your complete results and analysis in your student dashboard.
//                 </p>
//               </div>
              
//               <div style="text-align: center; margin-top: 30px; color: #9CA3AF; font-size: 12px;">
//                 <p>© 2024 Olympiad Platform. All rights reserved.</p>
//                 <p>Celebrating student achievements and fostering continuous learning</p>
//               </div>
//             </div>
//           `,
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`✅ Thank you email sent to ${student.name} (${student.email}) - Score: ${totalScore}`);
//         sentCount++;
//       } catch (emailError) {
//         console.error(`❌ Failed to send thank you email to ${student.email}:`, emailError);
//       }
//     });

//     await Promise.allSettled(emailPromises);

//     console.log(`📊 Thank you email summary: ${sentCount}/${participants.length} emails sent successfully`);

//     return {
//       sentCount,
//       totalParticipants: participants.length
//     };

//   } catch (error) {
//     console.error('Error sending finished olympiad notifications:', error);
    
//     throw new GraphQLError('Failed to send finished olympiad notifications', {
//       extensions: {
//         code: 'EMAIL_SERVICE_ERROR',
//       }
//     });
//   }
// };

// export const extractClassYearsFromOlympiad = (olympiad: any): ClassYear[] => {
//   if (!olympiad.classtypes || !Array.isArray(olympiad.classtypes)) {
//     return [];
//   }

//   return olympiad.classtypes.map((classType: any) => {
//     const classYearValue = classType.classYear;
//     return classYearValue as ClassYear;
//   });
// };